import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getProduct } from '@services/getProduct';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { logger } from '@libs/createLogger';

export const getProductById = async (event: APIGatewayProxyEvent) => {
  logger.info({ event }, 'event');
  const id = event.pathParameters.productId;
  try {
    const productById = await getProduct(id);
    return formatJSONResponse({ products: productById }, 200);
  } catch (error) {
    return formatJSONResponse({ message: 'Server Error' }, 500);
  }
}

export const main = middyfy(getProductById);
