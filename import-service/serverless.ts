import type { AWS } from '@serverless/typescript';

import { importFileParser, importProductsFile } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    stage: 'dev',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: '${cf:product-service-dev.QueueExpRef}'
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: '${cf:product-service-dev.QueueExpArn}',
      },
    ],
    lambdaHashingVersion: '20201221',
  },
    resources: {
    Resources: {
      GatewayResponseAccessDenied: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
          },
          ResponseType: 'ACCESS_DENIED',
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          }
        }
      },
      GatewayResponseUnauthorized: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
          },
          ResponseType: 'UNAUTHORIZED',
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          }
        }
      }
    }
  },
// import the function via paths
functions: { importFileParser, importProductsFile },
};

module.exports = serverlessConfiguration;
