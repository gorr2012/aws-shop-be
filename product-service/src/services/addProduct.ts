import { Client } from 'pg';
import { bdOptions } from '@libs/config';
import { OneProduct, PostProduct } from '../types/types';

export const addProduct = async (data: PostProduct): Promise<OneProduct[]> => {
    const client = new Client(bdOptions);
    const { title, description, price, count } = data;
    const textForProduct = 'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id';
    const valuesOfProduct = [title, description, price];
    const textForStock = 'INSERT INTO stocks(stock_id, count) VALUES($1, $2)';
    
    try {
        await client.connect();
        const { rows: products } = await client.query(textForProduct, valuesOfProduct);
        const valueOfStock = [products[0].id, count];
        const { rows: result } = await client.query(textForStock, valueOfStock);
        return result;
    } catch (error) {
        throw new Error('something went wrong');
    } finally {
        client.end();
    }
}
