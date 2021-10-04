import 'source-map-support/register';

import { SNS } from 'aws-sdk';
import { postProduct } from '@functions/postProduct/postProduct';

export const catalogBatchProcess = async (event) => {
  console.log('catalogBatchProcess ', event);

  const sns = new SNS({ region: 'eu-west-1' });

  const getMessageParams = (product) => {
    return {
      Subject: 'Hello description',
      Message: JSON.stringify(product),
      TopicArn: process.env.SNS_ARN,
      MessageAttributes: {
        event: {
          DataType: 'String',
          StringValue: 'description',
        },
        description: {
          DataType: 'String',
          StringValue: JSON.parse(product.replace(/^\uFEFF/gi, '')).description
        }
      }
    }
  };

  event.Records.forEach(async ({ body }) => {
    await postProduct({ body: body.replace(/\ufeff/gi, '') });
    const messageParams = getMessageParams(body);
    await sns.publish(messageParams).promise();
  });
}

// export const main = middyfy(catalogBatchProcess);
