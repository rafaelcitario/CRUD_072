import { _env } from '@src/env';
import { generateBinaryID } from '@src/util/generate_binaryId';
import { createConnection } from 'mysql2';

( async function () {
    const cnn = await createConnection( {
        host: _env.DB_HOST,
        user: _env.DB_USER,
        database: _env.DB_NAME,
        password: _env.DB_PASSWORD,
    } );

    const userId = generateBinaryID();
    const envetId = generateBinaryID();
} )();

