import { EventService } from '@src/http/services/events/events.service';
import { Response, Request } from 'express';

export class EventsController {
    static async create ( req: Request<unknown, undefined, { title: string, date: string; }>, res: Response ): Promise<void> {
        const { email, userId } = req.user!;
        const { title, date } = req.body;
        try {
            await EventService.create( { email, userId, title, date } );
            const code = 201;
            res.status( code ).json( { code, status: 'event created successfuly' } );
            return;
        } catch ( e ) {
            if ( e instanceof Error ) {
                res.status( 400 ).json( { error: e.message, message: 'Invalid values to create a new event' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    }
    static async list ( req: Request<unknown, undefined, { title: string, date: Date; }>, res: Response ): Promise<void> {
        const { email, userId } = req.user!;
        try {
            const events = await EventService.list( { email, userId } );
            const code = 200;
            res.status( code ).json( { events } );
            return;
        } catch ( e ) {
            if ( e instanceof Error ) {
                res.status( 400 ).json( { error: e.message, message: 'Invalid values to find events' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    };
    static async findOne ( req: Request<{ id: string; }, undefined, { title: string, date: Date; }>, res: Response ): Promise<void> {
        const { email, userId } = req.user!;
        const { id } = req.params;
        try {
            const event = await EventService.find( { eventId: id, email, userId } );
            const code = 200;
            res.status( code ).json( { event } );
            return;
        } catch ( e ) {
            if ( e instanceof Error ) {
                res.status( 400 ).json( { error: e.message, message: 'Invalid values to find events' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    };
    static async update ( req: Request<{ id: string; }, undefined, { title: string, date: string; }>, res: Response ): Promise<void> {
        const { email, userId } = req.user!;
        const { id } = req.params;
        const { date, title } = req.body;
        try {
            const event = await EventService.update( { eventId: id, email, userId, date, title } );
            const code = 201;
            res.status( code ).json( { ...event } );
            return;
        } catch ( e ) {
            if ( e instanceof Error ) {
                res.status( 400 ).json( { error: e.message, message: 'Invalid values to update events' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    };
    static async delete ( req: Request<{ id: string; }, undefined, { title: string, date: Date; }>, res: Response ): Promise<void> {
        const { email, userId } = req.user!;
        const { id } = req.params;
        try {
            const event = await EventService.delete( { eventId: id, email, userId } );
            const code = 201;
            res.status( code ).json( { ...event } );
            return;
        } catch ( e ) {
            if ( e instanceof Error ) {
                res.status( 400 ).json( { error: e.message, message: 'Invalid values to delete events' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    };
}
