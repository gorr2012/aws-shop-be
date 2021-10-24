import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { logger } from '@libs/createLogger';
// import { validateData } from '@libs/validateData';
import { delProduct } from '@services/delProduct';

export const deleteProduct = async (event: APIGatewayProxyEvent) => {
    logger.info(event, 'event');
    const id = event.pathParameters.productId;
    
    try {
        const result = await delProduct(id);
        return formatJSONResponse({ message: result }, 200);
    } catch (error) {
        return formatJSONResponse({ message: `Server ${error}` }, 500);
    }
}

export const main = middyfy(deleteProduct);
