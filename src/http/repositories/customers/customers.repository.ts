import { databaseConnection } from '@src/database';

export class CustomerRepository {
    static async list ( data: { userId: string, email: string; } ) {
        const { email, userId } = data;
        const database = await databaseConnection();
        try {
            const sql = `
                SELECT email
                FROM users
                WHERE id != UNHEX(?)
                AND email != (?)
            `;
            const [customers] = await database.query( sql, [userId.replaceAll( '-', '' ), email] );
            return customers;
        } catch {
            throw new Error( 'Failed to recover data from database' );
        } finally {
            await database.end();
        }
    }
}