import AWS from 'aws-sdk-mock';
import { catalogBatchProcess } from '@functions/catalog/handler';
import * as DBFunctions from '@services/addProduct';
import * as dataPost from '@functions/postProduct/postProduct';

import { sqsEventoneProdMock, sqsEventproductsListFullMock } from '../../mocks/productsListMock';

const snsPublishMock = jest.fn().mockImplementation(() => Promise.resolve());

jest.spyOn(DBFunctions, 'addProduct').mockReturnValue(null);
(dataPost as any).postProduct = jest.fn().mockImplementation(() => Promise.resolve());

describe('Tests for catalogBatchProcess', () => {
  test('catalogBatchProcess should runs once', async () => {
    AWS.mock('SNS', 'publish', snsPublishMock);
    await catalogBatchProcess(sqsEventoneProdMock);
    expect(snsPublishMock).toBeCalled();
    expect(snsPublishMock).toBeCalledTimes(1);
  });

  test('catalogBatchProcess should runs twice', async () => {
    AWS.mock('SNS', 'publish', snsPublishMock);

    await catalogBatchProcess(sqsEventproductsListFullMock);

    expect(snsPublishMock).toBeCalled();
    expect(snsPublishMock).toBeCalledTimes(2);
  });
})
