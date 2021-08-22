import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<string> = async () => {
  return formatJSONResponse({
    products: products
  }, 200);
}

export const main = middyfy(getProductsList);

const products = [
  {
    "count": 4,
    "description": "Short Product Description1",
    "id": "1a",
    "price": 2.4,
    "title": "ProductOne"
  },
  {
    "count": 6,
    "description": "Short Product Description3",
    "id": "2a",
    "price": 10,
    "title": "ProductNew"
  },
  {
    "count": 7,
    "description": "Short Product Description2",
    "id": "3a",
    "price": 23,
    "title": "ProductTop"
  },
  {
    "count": 12,
    "description": "Short Product Description7",
    "id": "4a",
    "price": 15,
    "title": "ProductTitle"
  },
  {
    "count": 7,
    "description": "Short Product Description2",
    "id": "5a",
    "price": 23,
    "title": "Product"
  },
  {
    "count": 8,
    "description": "Short Product Description4",
    "id": "6a",
    "price": 15,
    "title": "ProductTest"
  },
  {
    "count": 2,
    "description": "Short Product Descriptio1",
    "id": "7a",
    "price": 23,
    "title": "Product2"
  },
  {
    "count": 3,
    "description": "Short Product Description7",
    "id": "8a",
    "price": 15,
    "title": "ProductName"
  },
  {
    "count": 3,
    "description": "Short Product Description7",
    "id": "9a",
    "price": 15,
    "title": "The best product"
  }
]

