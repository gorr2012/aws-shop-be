import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { productsList } from '../productsList';
import { OneProduct } from 'src/types/types';

export const findProduct = async (productsArray: OneProduct[], id: string): Promise<OneProduct | null> => {
  const productsList = await Promise.resolve(productsArray);
  return productsList.find(e => e.id === id);
}

export const getProductById = async (event) => {
  const productById = await findProduct(productsList, event.pathParameters.productId);
  
  return productById ?
    formatJSONResponse({ products: [productById] }, 200) :
    formatJSONResponse({ products: event.pathParameters.productId }, 404)
}

export const main = middyfy(getProductById);
