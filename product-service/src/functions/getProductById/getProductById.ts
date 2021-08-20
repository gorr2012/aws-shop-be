import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const products = [
  {
    "count": 4,
    "description": "Short Product Description1",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    "price": 2.4,
    "title": "ProductOne"
  },
  {
    "count": 6,
    "description": "Short Product Description3",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
    "price": 10,
    "title": "ProductNew"
  },
  {
    "count": 7,
    "description": "Short Product Description2",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
    "price": 23,
    "title": "ProductTop"
  },
  {
    "count": 12,
    "description": "Short Product Description7",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    "price": 15,
    "title": "ProductTitle"
  },
  {
    "count": 7,
    "description": "Short Product Description2",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    "price": 23,
    "title": "Product"
  },
  {
    "count": 8,
    "description": "Short Product Description4",
    "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    "price": 15,
    "title": "ProductTest"
  },
  {
    "count": 2,
    "description": "Short Product Descriptio1",
    "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    "price": 23,
    "title": "Product2"
  },
  {
    "count": 3,
    "description": "Short Product Description7",
    "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    "price": 15,
    "title": "ProductName"
  },
  {
    "count": 3,
    "description": "Short Product Description7",
    "id": "7567ec4b-b10c-45c5-9345-fc73c45a802",
    "price": 15,
    "title": "The best product"
  }
]

export const getProductById: ValidatedEventAPIGatewayProxyEvent<string> = async (event) => {
  const productById = products.find(e => e.id === event.pathParameters.productId);
  
  if (!productById) {
    return formatJSONResponse({
      products: event.pathParameters.productId
    }, 404);
  }
  return formatJSONResponse({
    products: [ productById ]}, 200);
}

export const main = middyfy(getProductById);
