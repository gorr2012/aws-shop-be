import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { productsList } from '../productsList';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<string> = async (event) => {
  const productsArray = await productsList;
  const productById = productsArray.find(e => e.id === event.pathParameters.productId);
  
  if (!productById) {
    return formatJSONResponse({
      products: event.pathParameters.productId
    }, 404);
  }
  return formatJSONResponse({
    products: [ productById ]}, 200);
}

export const main = middyfy(getProductById);
