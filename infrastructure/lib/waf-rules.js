"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWafRules = void 0;
function createWafRules() {
    return [
        // 1. Rate Limiting (Block > 100 requests per 5 minutes)
        {
            name: 'RateLimit',
            priority: 100,
            statement: {
                rateBasedStatement: {
                    limit: 100,
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
exports.createWafRules = createWafRules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FmLXJ1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2FmLXJ1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQWdCLGNBQWM7SUFDNUIsT0FBTztRQUNMLHdEQUF3RDtRQUN4RDtZQUNFLElBQUksRUFBRSxXQUFXO1lBQ2pCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFO2dCQUNULGtCQUFrQixFQUFFO29CQUNsQixLQUFLLEVBQUUsR0FBRztvQkFDVixnQkFBZ0IsRUFBRSxJQUFJO2lCQUN2QjthQUNGO1lBQ0QsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNyQixnQkFBZ0IsRUFBRTtnQkFDaEIsc0JBQXNCLEVBQUUsSUFBSTtnQkFDNUIsd0JBQXdCLEVBQUUsSUFBSTtnQkFDOUIsVUFBVSxFQUFFLFdBQVc7YUFDeEI7U0FDRjtRQUNELHdEQUF3RDtRQUN4RDtZQUNFLElBQUksRUFBRSxtQkFBbUI7WUFDekIsUUFBUSxFQUFFLEdBQUc7WUFDYixTQUFTLEVBQUU7Z0JBQ1QseUJBQXlCLEVBQUU7b0JBQ3pCLFVBQVUsRUFBRSxLQUFLO29CQUNqQixJQUFJLEVBQUUsOEJBQThCO2lCQUNyQzthQUNGO1lBQ0QsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixnQkFBZ0IsRUFBRTtnQkFDaEIsc0JBQXNCLEVBQUUsSUFBSTtnQkFDNUIsd0JBQXdCLEVBQUUsSUFBSTtnQkFDOUIsVUFBVSxFQUFFLG1CQUFtQjthQUNoQztTQUNGO1FBQ0QsMENBQTBDO1FBQzFDO1lBQ0UsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixRQUFRLEVBQUUsR0FBRztZQUNiLFNBQVMsRUFBRTtnQkFDVCx5QkFBeUIsRUFBRTtvQkFDekIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLElBQUksRUFBRSxzQ0FBc0M7aUJBQzdDO2FBQ0Y7WUFDRCxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVCLGdCQUFnQixFQUFFO2dCQUNoQixzQkFBc0IsRUFBRSxJQUFJO2dCQUM1Qix3QkFBd0IsRUFBRSxJQUFJO2dCQUM5QixVQUFVLEVBQUUsb0JBQW9CO2FBQ2pDO1NBQ0Y7UUFDRCw2REFBNkQ7UUFDN0Q7WUFDRSxJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFO2dCQUNULHlCQUF5QixFQUFFO29CQUN6QixVQUFVLEVBQUUsS0FBSztvQkFDakIsSUFBSSxFQUFFLHVDQUF1QztpQkFDOUM7YUFDRjtZQUNELGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUIsZ0JBQWdCLEVBQUU7Z0JBQ2hCLHNCQUFzQixFQUFFLElBQUk7Z0JBQzVCLHdCQUF3QixFQUFFLElBQUk7Z0JBQzlCLFVBQVUsRUFBRSxrQkFBa0I7YUFDL0I7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDO0FBdkVELHdDQXVFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdhZnYyIGZyb20gJ2F3cy1jZGstbGliL2F3cy13YWZ2Mic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXYWZSdWxlcygpOiB3YWZ2Mi5DZm5XZWJBQ0wuUnVsZVByb3BlcnR5W10ge1xuICByZXR1cm4gW1xuICAgIC8vIDEuIFJhdGUgTGltaXRpbmcgKEJsb2NrID4gMTAwIHJlcXVlc3RzIHBlciA1IG1pbnV0ZXMpXG4gICAge1xuICAgICAgbmFtZTogJ1JhdGVMaW1pdCcsXG4gICAgICBwcmlvcml0eTogMTAwLFxuICAgICAgc3RhdGVtZW50OiB7XG4gICAgICAgIHJhdGVCYXNlZFN0YXRlbWVudDoge1xuICAgICAgICAgIGxpbWl0OiAxMDAsXG4gICAgICAgICAgYWdncmVnYXRlS2V5VHlwZTogJ0lQJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhY3Rpb246IHsgYmxvY2s6IHt9IH0sXG4gICAgICB2aXNpYmlsaXR5Q29uZmlnOiB7XG4gICAgICAgIHNhbXBsZWRSZXF1ZXN0c0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIGNsb3VkV2F0Y2hNZXRyaWNzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbWV0cmljTmFtZTogJ1JhdGVMaW1pdCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gMi4gQVdTIE1hbmFnZWQgUnVsZXMgLSBDb21tb24gUnVsZSBTZXQgKE9XQVNQIFRvcCAxMClcbiAgICB7XG4gICAgICBuYW1lOiAnQVdTLUNvbW1vblJ1bGVTZXQnLFxuICAgICAgcHJpb3JpdHk6IDIwMCxcbiAgICAgIHN0YXRlbWVudDoge1xuICAgICAgICBtYW5hZ2VkUnVsZUdyb3VwU3RhdGVtZW50OiB7XG4gICAgICAgICAgdmVuZG9yTmFtZTogJ0FXUycsXG4gICAgICAgICAgbmFtZTogJ0FXU01hbmFnZWRSdWxlc0NvbW1vblJ1bGVTZXQnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG92ZXJyaWRlQWN0aW9uOiB7IG5vbmU6IHt9IH0sXG4gICAgICB2aXNpYmlsaXR5Q29uZmlnOiB7XG4gICAgICAgIHNhbXBsZWRSZXF1ZXN0c0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIGNsb3VkV2F0Y2hNZXRyaWNzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbWV0cmljTmFtZTogJ0FXUy1Db21tb25SdWxlU2V0JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyAzLiBBV1MgTWFuYWdlZCBSdWxlcyAtIEtub3duIEJhZCBJbnB1dHNcbiAgICB7XG4gICAgICBuYW1lOiAnQVdTLUtub3duQmFkSW5wdXRzJyxcbiAgICAgIHByaW9yaXR5OiAzMDAsXG4gICAgICBzdGF0ZW1lbnQ6IHtcbiAgICAgICAgbWFuYWdlZFJ1bGVHcm91cFN0YXRlbWVudDoge1xuICAgICAgICAgIHZlbmRvck5hbWU6ICdBV1MnLFxuICAgICAgICAgIG5hbWU6ICdBV1NNYW5hZ2VkUnVsZXNLbm93bkJhZElucHV0c1J1bGVTZXQnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIG92ZXJyaWRlQWN0aW9uOiB7IG5vbmU6IHt9IH0sXG4gICAgICB2aXNpYmlsaXR5Q29uZmlnOiB7XG4gICAgICAgIHNhbXBsZWRSZXF1ZXN0c0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIGNsb3VkV2F0Y2hNZXRyaWNzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbWV0cmljTmFtZTogJ0FXUy1Lbm93bkJhZElucHV0cycsXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gNC4gQVdTIE1hbmFnZWQgUnVsZXMgLSBBbWF6b24gSVAgUmVwdXRhdGlvbiBMaXN0IChCb3RuZXRzKVxuICAgIHtcbiAgICAgIG5hbWU6ICdBV1MtSVBSZXB1dGF0aW9uJyxcbiAgICAgIHByaW9yaXR5OiA0MDAsXG4gICAgICBzdGF0ZW1lbnQ6IHtcbiAgICAgICAgbWFuYWdlZFJ1bGVHcm91cFN0YXRlbWVudDoge1xuICAgICAgICAgIHZlbmRvck5hbWU6ICdBV1MnLFxuICAgICAgICAgIG5hbWU6ICdBV1NNYW5hZ2VkUnVsZXNBbWF6b25JcFJlcHV0YXRpb25MaXN0JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBvdmVycmlkZUFjdGlvbjogeyBub25lOiB7fSB9LFxuICAgICAgdmlzaWJpbGl0eUNvbmZpZzoge1xuICAgICAgICBzYW1wbGVkUmVxdWVzdHNFbmFibGVkOiB0cnVlLFxuICAgICAgICBjbG91ZFdhdGNoTWV0cmljc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1ldHJpY05hbWU6ICdBV1MtSVBSZXB1dGF0aW9uJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgXTtcbn1cbiJdfQ==