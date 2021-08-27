import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { productsList } from '../productsList';
import { OneProduct } from 'src/types/types';

export const getData = async (productsList: OneProduct[]): Promise<OneProduct[] | null> =>
await Promise.resolve(productsList);

export const getProductsList = async () => {
  const productsArray = await getData(productsList);
  
  return productsArray ?
  formatJSONResponse({ products: productsArray }, 200) :
  formatJSONResponse({ message: 'Server Error'}, 500);
}

export const main = middyfy(getProductsList);
