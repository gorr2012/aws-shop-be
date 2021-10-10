import { Client } from 'pg';
import { bdOptions } from '@libs/config';
import { OneProduct } from '../types/types';

export const updateProduct = async (values: OneProduct, id: string): Promise<string> => {
    const client = new Client(bdOptions);
    const { title, description, price, count } = values;
    
    const textForProduct = `
        UPDATE products
        SET title='${title}', description='${description}', price=${price}
        WHERE id='${id}'
    `
    const textForStock = `UPDATE stocks SET count=${count} WHERE stock_id='${id}'`;

    try {
        await client.connect();
        await client.query('BEGIN')
        await client.query(textForProduct);
        await client.query(textForStock);
        await client.query('COMMIT')
        return 'result';
    } catch (error) {
        throw new Error('something went wrong update ' + JSON.stringify(error));
    } finally {
        client.end();
    }
}
