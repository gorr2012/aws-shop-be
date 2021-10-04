import type { AWS } from '@serverless/typescript';
import { getProductById, getProductsList, postProduct, catalogBatchProcess } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  useDotenv: true,
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
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: 'productsdb.celi3w8vq8941.eu-west-1.rds.amazonaws.com',
      PG_PORT: '5432',
      PG_DATABASE: 'postgres',
      PG_USERNAME: 'postgres',
      SNS_ARN: {
        Ref: 'SNSTopic'
      }
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sns:*'],
        Resource: {
          Ref: 'SNSTopic',
        },
      },
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: [
          {
            'Fn::GetAtt': ['MySQS', 'Arn'],
          },
        ],
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      MySQS: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'product-service-MySQS'
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'product-service-sqs-sns-topic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'maxnovbel@mail.ru',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
        }
      },
      SNSSubscriptionFilteredBydescription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'sergey_gornost@mail.ru',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            description: [{ prefix: 'Project2' }]
          },
        },
      }
    },
    Outputs: {
      QueueExpRef: {
        Description: 'Export ref SQS',
        Value: {
          Ref: 'MySQS',
        },
        Export: {
          Name: {
            "Fn::Sub": "${AWS::StackName}-QueueExpRef"
          }
        }
      },
      QueueExpArn: {
        Description: 'Export ref SQS',
        Value: {
          "Fn::GetAtt": ["MySQS", "Arn"]
        },
        Export: {
          Name: {
            "Fn::Sub": "${AWS::StackName}-QueueExpArn"
          }
        }
      }
    },
  },
  // import the function via paths
  functions: { getProductById, getProductsList, postProduct, catalogBatchProcess },
};

module.exports = serverlessConfiguration;
