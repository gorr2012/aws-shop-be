import { logger } from '@libs/createLogger';

export const validateData = (body) => {
    logger.info({ body }, 'product');
    const product = JSON.parse(body);
    const { title, description, price, count } = product;
    const value = {
        title: title,
        description: description,
        price: +price,
        count: +count
    }
    if (!title || typeof title !== 'string') {
        return { value, error: '"title" is invalid' };
    }
    if (!description || typeof description !== 'string') {
        return { value, error: '"description" is invalid' };
    }
    if (value.price === null || value.price === undefined || typeof value.price !== 'number') {
        return { value, error: '"price" is invalid' };
    }
    if (value.count === null || value.count === undefined || typeof value.count !== 'number' || value.count < 1) {
        return { value, error: '"count" is invalid' };
    }
    return { value }
}
