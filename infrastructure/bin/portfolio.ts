#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PortfolioStack } from '../lib/portfolio-stack';

const app = new cdk.App();
// CDK_DEPLOY_* lets you override at deploy time: CDK_DEPLOY_REGION=us-east-1 npx cdk deploy
// WAF for CloudFront must be in us-east-1, so use that when your default region is different
new PortfolioStack(app, 'PortfolioStack', {
  env: { 
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
  description: 'Secure Full-Stack Portfolio Infrastructure',
});
