#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const portfolio_stack_1 = require("../lib/portfolio-stack");
const app = new cdk.App();
// WAFv2 CLOUDFRONT scope requires us-east-1
new portfolio_stack_1.PortfolioStack(app, 'PortfolioStack', {
    env: {
        account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEPLOY_REGION || 'us-east-1',
    },
    description: 'Secure Full-Stack Portfolio Infrastructure',
});
