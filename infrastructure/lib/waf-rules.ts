import * as wafv2 from 'aws-cdk-lib/aws-wafv2';

export function createWafRules(): wafv2.CfnWebACL.RuleProperty[] {
  return [
    // 1. Rate Limiting (Block > 1000 requests per 5 minutes)
    {
      name: 'RateLimit',
      priority: 100,
      statement: {
        rateBasedStatement: {
          limit: 1000,
          aggregateKeyType: 'IP',
        },
      },
      action: { block: {} },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'RateLimit',
      },
    },
    // 2. AWS Managed Rules - Common Rule Set (OWASP Top 10)
    {
      name: 'AWS-CommonRuleSet',
      priority: 200,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesCommonRuleSet',
        },
      },
      overrideAction: { none: {} },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWS-CommonRuleSet',
      },
    },
    // 3. AWS Managed Rules - Known Bad Inputs
    {
      name: 'AWS-KnownBadInputs',
      priority: 300,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesKnownBadInputsRuleSet',
        },
      },
      overrideAction: { none: {} },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWS-KnownBadInputs',
      },
    },
    // 4. AWS Managed Rules - Amazon IP Reputation List (Botnets)
    {
      name: 'AWS-IPReputation',
      priority: 400,
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: 'AWSManagedRulesAmazonIpReputationList',
        },
      },
      overrideAction: { none: {} },
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: 'AWS-IPReputation',
      },
    },
  ];
}
