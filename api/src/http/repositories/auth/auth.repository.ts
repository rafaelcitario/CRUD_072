import { databaseConnection } from 'src/database';
import { generateBinaryID } from 'src/util/generate_binaryId';
import { ResultSetHeader } from 'mysql2/promise';
import { _env } from 'src/env';

interface User extends ResultSetHeader {
    id: Uint8Array,
    email: string,
    is_valid_email: number;
}
export class AuthRepository {

    static async userLogin ( data: { email: string; password: string; } ): Promise<User[] | []> {
        const { email, password } = data;
        const database = await databaseConnection();

        try {
            const sql = `
        SELECT id, email, is_valid_email
        FROM users
        WHERE email = ? AND password_hash = ? AND is_valid_email = 1
        LIMIT 1
      `;
            const [user] = await database.query<User[]>( sql, [email, password, 1] );
            return user;
        } catch ( e ) {
            throw new Error( `Error: ${e instanceof Error ? e.message : 'undefined Error at database connection'}` );
        } finally {
            await database.end();
        }
    }

    static async userRegister ( data: { email: string; password: string; } ): Promise<User[] | []> {
        const { email, password } = data;
        const database = await databaseConnection();
        try {
            database.beginTransaction();
            let sql = `
            INSERT
            INTO users
            (id, email, password_hash)
            VALUES (?, ?, ?)`;
            const userId: Uint8Array = generateBinaryID();
            await database.execute( sql, [userId, email, password] );
            await database.commit();

            sql = `
            SELECT id, email, is_valid_email
            FROM users
            WHERE email = ? AND password_hash = ? AND is_valid_email = 0
            `;
            const [user] = await database.query<User[]>( sql, [email, password, 1] );
            return user;
        } catch ( e ) {
            await database.rollback();
            throw new Error( `Error: ${e instanceof Error ? e.message : 'undefined Error at database connection'}` );
        } finally {
            await database.end();
        }
    }

    static async validateEmailAccount ( data: { userId: string, email: string; } ): Promise<void> {
        const { userId, email } = data;
        const database = await databaseConnection();
        try {
            await database.beginTransaction();
            const sql = `
            UPDATE users
            SET is_valid_email = 1
            WHERE id = UNHEX(?) AND email = (?)
            `;
            await database.query<User[]>( sql, [userId.replaceAll( '-', '' ), email] );
            await database.commit();
            return;
        } catch ( e ) {
            await database.rollback();
            throw new Error( `Error: ${e instanceof Error ? e.message : 'undefined Error at database connection'}` );
        } finally {
            await database.end();
        }
    }

    static async renew ( data: { userId: string; rf_token: string; } ) {
        const { userId, rf_token } = data;
        const database = await databaseConnection();

        try {
            await database.beginTransaction();

            const sql = `
      INSERT INTO tokens
      (id, user_id, token, type, is_used, expires_at)
      VALUES (?, UNHEX(?), ?, ?, ?, ?)
    `;

            const expiresAt = new Date( Date.now() + Number( _env.JWT_LIFETIME_RF_TOKEN ) * 1000 );
            const id = generateBinaryID();
            await database.query( sql, [
                id,
                userId.replaceAll( '-', '' ),
                rf_token,
                'refresh_token',
                1,
                expiresAt,
            ] );

            await database.commit();
            return;
        } catch ( e ) {
            await database.rollback();
            console.log( e );
            throw new Error(
                `Error: ${e instanceof Error ? e.message : 'undefined Error at database connection'}`
            );
        } finally {
            await database.end();
        }
    }
};
