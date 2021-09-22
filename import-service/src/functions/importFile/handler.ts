import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { S3 } from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import * as csv from 'csv-parser';
import { BUCKET, IResponse } from 'src/types/types';


const importFileParser = async (event: S3Event): Promise<IResponse> => {
  const s3 = new S3({ region: 'eu-west-1' });

  try {
    const results = [];

    for (const record of event.Records) {
      const fileName = record.s3.object.key;
      const fileOptions = { Bucket: BUCKET, Key: fileName };
      const newFileOptions = {
        Bucket: BUCKET,
        CopySource: BUCKET + '/' + fileName,
        Key: fileName.replace('uploads', 'parsed')
      }

      await new Promise<void>((resolve) => {
        s3.getObject(fileOptions)
          .createReadStream()
          .pipe(csv({
            separator: ';',
            headers: ['Title', 'Description', 'Price', 'Count', 'Action']
          }))
          .on('data', (data) => results.push(data))
          .on('end', () => {
            console.log(results);
            resolve();
          });
      });
      await s3.copyObject(newFileOptions).promise()
      await s3.deleteObject(fileOptions).promise()
    }
    return formatJSONResponse(200, results);
  } catch (err) {
    return formatJSONResponse(500, err?.message);
  }
}

export const main = middyfy(importFileParser);
