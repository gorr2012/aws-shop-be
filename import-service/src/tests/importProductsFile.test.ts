import AWS from 'aws-sdk-mock';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { importProductsFile } from '../functions/import/handler';

const eventMock: APIGatewayProxyEvent = {
  queryStringParameters: {
    name: 'name',
  },
} as any;

describe('Tests for importProductsFile', () => {
  beforeEach(() => {
    AWS.mock('S3', 'getSignedUrl', 'signed_url');
  });

  test('Should return correct signedUrl in body', async () => {
    const result = await importProductsFile(eventMock);
    expect(result.statusCode).toBe(200);
    expect(result.body).toContain('signed_url');
  });

  test('Should return statusCode 500', async () => {
    const result = await importProductsFile(null);
    expect(result.statusCode).toBe(500);
  });
});
