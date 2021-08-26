import 'source-map-support/register';

// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { productsList } from '../productsList';

export const getProductsList = async () => {
  const productsArray = await productsList;
  return productsArray ?
  formatJSONResponse({ products: productsArray }, 200) :
  formatJSONResponse({ message: 'Server Error'}, 500);
}

export const main = middyfy(getProductsList);
