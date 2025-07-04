import { _env } from 'src/env';
import { generateBinaryID } from 'src/util/generate_binaryId';
import { createHash } from 'crypto';
import { createConnection } from 'mysql2/promise';

( async function () {
    const cnn = await createConnection( {
        host: _env.DB_HOST,
        user: _env.DB_USER,
        database: _env.DB_NAME,
        password: _env.DB_PASSWORD,
    } );


    const users = [
        { email: 'seed01@email.com.br', password: 'user_pass_hash01' },
        { email: 'seed02@email.com.br', password: 'user_pass_hash02' },
        { email: 'seed03@email.com.br', password: 'user_pass_hash03' },
        { email: 'seed04@email.com.br', password: 'user_pass_hash04' },
        { email: 'seed05@email.com.br', password: 'user_pass_hash05' },
    ];

    try {
        await cnn.beginTransaction();
        for ( const user of users ) {
            const userId = generateBinaryID();
            const envetId = generateBinaryID();

            const hash = createHash( 'sha512' );
            const password_hash = hash.update( user.password ).digest( 'base64url' );

            await cnn.execute(
                `INSERT INTO 
                users (id, email, password_hash, is_valid_email)
                VALUES (?, ?, ?, ?)`,
                [
                    userId,
                    user.email,
                    password_hash,
                    1
                ]
            );

            await cnn.execute(
                `INSERT INTO 
                events (id, title, event_date, is_expired, user_id)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    envetId,
                    `Evento de ${user.email}`,
                    '2025-06-30',
                    new Date() > new Date( '2025-06-30' ) ? 1 : 0,
                    userId
                ]
            );
        }

        await cnn.commit();
        console.log( '🌱 Seed succefuly' );
    } catch ( err ) {
        await cnn.rollback();
        const typedError = err as Error;
        throw new Error( `Database Rollback, error to populate with seed\n ${typedError.stack}` );
    } finally {
        await cnn.end();
    }
} )().catch( ( err ) => {
    const typedError = err as Error;
    throw new Error( `Error to populate database\n ${typedError.stack}` );
} );