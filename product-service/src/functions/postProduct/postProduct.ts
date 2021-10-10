import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/apiGateway';
// import { APIGatewayProxyEvent } from 'aws-lambda';
import { logger } from '@libs/createLogger';
import { validateData } from '@libs/validateData';
import { addProduct } from '@services/addProduct';

export const postProduct = async ({ body }) => {
    logger.info(body, 'body');
    const { error, value } = validateData(body);
    if(error) {
        return formatJSONResponse({ message: `invalid data ${error}` }, 400)
    }
    try {
        const rows = await addProduct(value);
        return formatJSONResponse({ products: rows }, 200);
    } catch (error) {
        return formatJSONResponse({ message: `Server ${error}` }, 500);
    }
}

export const main = middyfy(postProduct);
