import { _env } from 'src/env';
import { createConnection } from 'mysql2/promise';
export async function databaseConnection () {
    return await createConnection( {
        host: _env.DB_HOST,
        user: _env.DB_USER,
        database: _env.DB_NAME,
        password: _env.DB_PASSWORD,
    } );
};