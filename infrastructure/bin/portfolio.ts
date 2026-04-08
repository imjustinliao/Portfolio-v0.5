#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PortfolioStack } from '../lib/portfolio-stack';

const app = new cdk.App();
// WAFv2 with scope CLOUDFRONT must be created in us-east-1 (AWS requirement), so this stack
// defaults to us-east-1 even if ~/.aws/config uses another region. Override only if you know
// what you're doing: CDK_DEPLOY_REGION=us-east-1 npx cdk deploy
new PortfolioStack(app, 'PortfolioStack', {
  env: { 
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEPLOY_REGION || 'us-east-1',
  },
  description: 'Secure Full-Stack Portfolio Infrastructure',
});
