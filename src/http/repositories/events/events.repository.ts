import { databaseConnection } from '@src/database';
import { generateBinaryID } from '@src/util/generate_binaryId';
import { ResultSetHeader } from 'mysql2';

export class EventRepository {
    static async create ( data: { title: string, date: string, email: string; userId: string; } ): Promise<void> {
        const { title, date, userId } = data;
        const database = await databaseConnection();

        const eventId: Uint8Array = generateBinaryID();

        try {
            await database.beginTransaction();

            const sql = `
        INSERT INTO events (id, user_id, title, event_date)
        VALUES (?, UNHEX(?), ?, ?)
      `;
            await database.query( sql, [
                eventId,
                userId.replaceAll( '-', '' ),
                title,
                date,
            ] );

            await database.commit();
        } catch ( e ) {
            await database.rollback();
            throw e;
        } finally {
            await database.end();
        }
    }

    static async list ( data: { email: string; userId: string; } ) {
        const { email, userId } = data;
        const database = await databaseConnection();

        try {
            const sql = `
        SELECT
          HEX(events.id),
          title,
          event_date
        FROM events
        INNER JOIN users
        ON users.id = events.user_id
        WHERE email like (?)
        ORDER BY event_date ASC
      `;
            const [rows] = await database.query( sql, [email] );
            return rows;
        } finally {
            await database.end();
        }
    }

    static async find ( data: { eventId: string; email: string; userId: string; } ) {
        const { eventId, email, userId } = data;
        const database = await databaseConnection();

        try {
            const sql = `
        SELECT
          HEX(events.id),
          title,
          event_date
        FROM events
        INNER JOIN users
        ON users.id = events.user_id
        WHERE email LIKE (?)
        LIMIT 1
      `;
            const [rows] = await database.query( sql, [email] );
            return Array.isArray( rows ) && rows.length > 0 ? rows[0] : null;
        } finally {
            await database.end();
        }
    }

    static async update ( data: { eventId: string; email: string; userId: string; title: string; date: string; } ):
        Promise<{ date?: string | undefined; title?: string | undefined; id: string; }> {
        const { eventId, email, userId, title, date } = data;
        const database = await databaseConnection();
        try {
            await database.beginTransaction();

            const sql = `
        UPDATE events
        SET title = ?, event_date = ?
        WHERE id LIKE UNHEX(?)
      `;
            const [result] = await database.query( sql, [title, date, eventId] );

            await database.commit();

            if ( 'affectedRows' in result && result.affectedRows === 0 ) {
                throw new Error( "Event not found or nothing was updated." );
            }

            if ( !date || !title || !eventId ) {
                throw new Error( "Event not found or nothing was updated." );
            }
            return {
                id: eventId,
                ...( title && { title } ),
                ...( date && { date: date } ),
            };
        } catch ( e ) {
            await database.rollback();
            throw e;
        } finally {
            await database.end();
        }
    }

    static async delete ( data: { eventId: string; email: string; userId: string; } ): Promise<boolean> {
        const { eventId, email, userId } = data;
        const database = await databaseConnection();

        try {
            await database.beginTransaction();

            const sql = `
        DELETE FROM events
        WHERE id = UNHEX(?)
          AND user_id = UNHEX(?)
      `;
            console.log( eventId, userId );
            const [result] = await database.query( sql, [eventId, userId.replaceAll( '-', '' )] );

            await database.commit();

            if ( 'affectedRows' in result && result.affectedRows === 0 ) {
                return false;
            }

            return true;
        } catch ( e ) {
            await database.rollback();
            throw e;
        } finally {
            await database.end();
        }
    }
}