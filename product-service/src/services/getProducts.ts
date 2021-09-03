import { Client } from 'pg';
import { bdOptions } from '@libs/config';
import { OneProduct } from '../types/types';

export const getProducts = async (): Promise<OneProduct[]> => {
    const client = new Client(bdOptions);
    const SQLForProduct = 
        `SELECT products.id, products.title, products.price, products.description, stocks.count
        FROM products
        INNER JOIN stocks ON products.id=stocks.stock_id`;

    try {
        await client.connect();
        const { rows: result } = await client.query(SQLForProduct);
        return result;
    } catch (error) {
        throw new Error('something went wrong');
    } finally {
        client.end();
    }
}
