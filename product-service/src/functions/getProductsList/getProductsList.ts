import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getProducts } from '@services/getProducts';
import { logger } from '@libs/createLogger';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const getProductsList = async (event: APIGatewayProxyEvent) => {
  logger.info({ event }, 'Products to show');
  try {
    const products = await getProducts();
    return formatJSONResponse({ products: products }, 200);
  } catch (error) {
    return formatJSONResponse({ message: `Server Error ${error}` }, 500);
  }
}

export const main = middyfy(getProductsList);
