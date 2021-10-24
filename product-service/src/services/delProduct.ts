import { Client } from 'pg';
import { bdOptions } from '@libs/config';
// import { OneProduct } from '../types/types';

export const delProduct = async (id: string): Promise<string> => {
    const client = new Client(bdOptions);
    const textForStock = `DELETE FROM stocks WHERE stock_id='${id}'`;
    const textForProduct = `DELETE FROM products WHERE id='${id}'`;
    
    try {
        await client.connect();
        await client.query('BEGIN')
        await client.query(textForStock);
        await client.query(textForProduct);
        await client.query('COMMIT')
        return 'result';
    } catch (error) {
        throw new Error('something went wrong delete ' + JSON.stringify(error));
    } finally {
        client.end();
    }
}
