import type { AWS } from '@serverless/typescript';
import { getProductById, getProductsList, postProduct } from '@functions/index';

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
      PG_PASSWORD: 'xssfiN5BvjtCcRLRFPYN1'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { getProductById, getProductsList, postProduct },
};

module.exports = serverlessConfiguration;
