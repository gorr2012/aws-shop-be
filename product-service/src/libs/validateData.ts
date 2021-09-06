import { APIGatewayProxyEvent } from 'aws-lambda';
import { logger } from '@libs/createLogger';

export const validateData = (event: APIGatewayProxyEvent) => {
    logger.info({ event }, 'event');
    const { title, description, price, count } = JSON.parse(event.body);
    const value = {
        title: title,
        description: description,
        price: price,
        count: count
    }
    if (!title || typeof title !== 'string') {
        return { value, error: '"title" is invalid' };
    }
    if (!description || typeof description !== 'string') {
        return { value, error: '"description" is invalid' };
    }
    if (price === null || price === undefined || typeof price !== 'number') {
        return { value, error: '"price" is invalid' };
    }
    if (count === null || count === undefined || typeof count !== 'number' || count < 1) {
        return { value, error: '"count" is invalid' };
    }
    return { value }
}
