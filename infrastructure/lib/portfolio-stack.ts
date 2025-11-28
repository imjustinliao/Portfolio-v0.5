import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as path from 'path';
import { Construct } from 'constructs';
import { createWafRules } from './waf-rules';

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ========================================================================
    // 1. DynamoDB Table (Chat History)
    // ========================================================================
    const chatTable = new dynamodb.Table(this, 'ChatTable', {
      partitionKey: { name: 'sessionId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Keep data even if stack is deleted
    });

    // ========================================================================
    // 2. Lambda Function (Backend API)
    // ========================================================================
    const secretHeaderValue = 'secret-' + Math.random().toString(36).substring(2, 15);

    const apiLambda = new lambda.Function(this, 'ApiLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'src/index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../backend')),
      environment: {
        TABLE_NAME: chatTable.tableName,
        CLOUDFRONT_SECRET: secretHeaderValue,
        // OPENAI_API_KEY will be set manually in console or via .env for deployment
      },
      timeout: cdk.Duration.seconds(30), // OpenAI can be slow
    });

    // Grant Lambda permission to write to DynamoDB
    chatTable.grantReadWriteData(apiLambda);

    // Create Function URL (Public but protected by secret header check)
    const functionUrl = apiLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // ========================================================================
    // 3. S3 Bucket (Frontend Hosting)
    // ========================================================================
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For portfolio, easy cleanup
      autoDeleteObjects: true,
    });

    // ========================================================================
    // 4. WAF (Web Application Firewall)
    // ========================================================================
    const webAcl = new wafv2.CfnWebACL(this, 'PortfolioWaf', {
      defaultAction: { allow: {} },
      scope: 'CLOUDFRONT',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'PortfolioWaf',
        sampledRequestsEnabled: true,
      },
      rules: createWafRules(),
    });

    // ========================================================================
    // 5. CloudFront Distribution
    // ========================================================================
    const distribution = new cloudfront.Distribution(this, 'PortfolioDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        compress: true,
      },
      additionalBehaviors: {
        '/api/*': {
          origin: new origins.HttpOrigin(cdk.Fn.select(2, cdk.Fn.split('/', functionUrl.url)), {
            customHeaders: {
              'x-origin-verify': secretHeaderValue, // The Secret Handshake
            },
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED, // Don't cache API responses
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        },
      },
      defaultRootObject: 'index.html',
      webAclId: webAcl.attrArn, // Attach WAF
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html', // SPA Routing support
        },
      ],
    });

    // ========================================================================
    // 6. Deploy Frontend to S3
    // ========================================================================
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../frontend/dist'))],
      destinationBucket: websiteBucket,
      distribution, // Invalidate CloudFront cache after deployment
      distributionPaths: ['/*'],
    });

    // ========================================================================
    // 7. Outputs
    // ========================================================================
    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'The URL of your secure portfolio',
    });

    new cdk.CfnOutput(this, 'LambdaSecretHeader', {
      value: secretHeaderValue,
      description: 'The secret header value (for verification)',
    });
  }
}
