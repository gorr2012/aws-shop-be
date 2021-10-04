import { mock } from 'aws-sdk-mock';
import { catalogBatchProcess } from '../../../src/functions/catalog/handler';
// import { SQSEvent } from 'aws-lambda';
import * as DBFunctions from '../../../src/services/addProduct';
import { sqsEventoneProdMock, sqsEventproductsListFullMock } from '../../mocks/productsListMock';

const snsPublishMock = jest.fn().mockImplementation(() => Promise.resolve());

jest.spyOn(DBFunctions, 'addProduct').mockReturnValue(null);

describe('Tests for CatalogBatchProcess', () => {
  test('catalogBatchProcess should emmit SNS publish one time with one product', async () => {
    console.log = jest.fn();
    mock('SNS', 'publish', snsPublishMock);

    await catalogBatchProcess(sqsEventoneProdMock);

    expect(snsPublishMock).toBeCalled();
    expect(snsPublishMock).toBeCalledTimes(1);
  });

  test('catalogBatchProcess should emmit SNS publish 9 times with 9 products', async () => {
    console.log = jest.fn();
    mock('SNS', 'publish', snsPublishMock);

    await catalogBatchProcess(JSON.stringify(sqsEventproductsListFullMock));

    expect(snsPublishMock).toBeCalled();
    expect(snsPublishMock).toBeCalledTimes(9);
  });
})
