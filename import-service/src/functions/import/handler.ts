import 'source-map-support/register';

import { S3 } from 'aws-sdk';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { IResponse } from 'src/types/types';

const BUCKET = 'gorr2012-uploads';

export const importProductsFile = async (event: APIGatewayProxyEvent): Promise<IResponse> => {  try {
  const s3 = new S3({ region: 'eu-west-1' });
  const s3Params = {
    Bucket: BUCKET,
    Key: `uploads/${event.queryStringParameters.name}`,
    Expires: 300,
    ContentType: 'text/csv'
  }
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
    return formatJSONResponse(200, uploadURL);
  } catch (err) {
    return formatJSONResponse(500, err?.message);
  }


}

export const main = middyfy(importProductsFile);
