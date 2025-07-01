import { databaseConnection } from '@src/database';
import { RowDataPacket } from 'mysql2/promise';

interface User extends RowDataPacket {
    id: Uint8Array,
    email: string,
    is_valid_email: number;
}
export class AuthRepository {
    static async login ( data: { email: string; password: string; } ): Promise<User[] | []> {
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

    static async createRegister ( data: { email: string; password: string; } ): Promise<void> {
        // Implementar
    }

    static async sendEmailToVerify ( data: { email: string; } ): Promise<void> {
        // Implementar
    }
}
