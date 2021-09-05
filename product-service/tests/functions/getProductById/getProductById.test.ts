import * as getProduct from '../../../src/functions/getProductById/getProductById';
import { event, oneProd, productsListFullMock } from '../../mocks/productsListMock';
const { getProductById, findProduct } = getProduct;

describe('getProductById test', () => {
  describe('should return right answer', () => {
    test('return response status 200', async () => {
      (getProduct as any).findProduct = jest.fn(() => oneProd);
      const arrayOfProducts = await getProductById(event);
      expect(arrayOfProducts.statusCode).toBe(200);
    })
  })
  test('return response status 404', async () => {
    (getProduct as any).findProduct = jest.fn(() => undefined);
    const arrayOfProducts = await getProductById(event);
    expect(arrayOfProducts.statusCode).toBe(404);
  })
  test('return response right product', async () => {
    const result = await findProduct(productsListFullMock, '3a');
    expect(result.id).toBe('3a');
  })
  test('should return undefined with incorrect id', async () => {
    const result = await findProduct(productsListFullMock, '3aa');
    expect(result).toBeUndefined();
  })

})