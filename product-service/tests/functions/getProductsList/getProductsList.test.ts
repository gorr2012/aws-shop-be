import { getProductsList } from '../../../src/functions/getProductsList/getProductsList';

describe('Should return right Error', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(getProductsList({}, 200)).toBe(3);
  });
});
