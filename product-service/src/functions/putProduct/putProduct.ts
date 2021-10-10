import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { logger } from '@libs/createLogger';
import { validateData } from '@libs/validateData';
import { updateProduct } from '@services/updateProduct';

export const putProduct = async (event: APIGatewayProxyEvent) => {
    logger.info(event.body, 'body');
    const { body } = event;
    const id = event.pathParameters.productId;
    
    const { error, value } = validateData(body);
    if(error) {
        return formatJSONResponse({ message: `invalid data ${error}` }, 400)
    }
    try {
        const rows = await updateProduct(value, id);
        return formatJSONResponse({ products: rows }, 200);
    } catch (error) {
        return formatJSONResponse({ message: `Server ${error}` }, 500);
    }
}

export const main = middyfy(putProduct);
