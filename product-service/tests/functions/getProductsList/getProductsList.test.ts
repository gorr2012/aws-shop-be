import { getProductsList } from '../../../src/functions/getProductsList/getProductsList';

describe('Should return Object', () => {
  test('return data as Object', async () => {
    const cv = await getProductsList();
    expect(cv).toBeInstanceOf(Object);
  });
  test('return correct statusCode', async () => {
    const cv = await getProductsList();
    expect(cv.statusCode).toBe(200);
  });
});
