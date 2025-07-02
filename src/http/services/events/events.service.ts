import { EventRepository } from '@src/http/repositories/events/events.repository';

export class EventService {
    static async create ( data: {
        email: string;
        userId: string;
        title: string;
        date: string;
    } ) {
        const { title, date, email, userId } = data;

        if ( title.trim().length < 1 ) {
            throw new Error( "The event title is required." );
        }

        if ( new Date( date ) <= new Date() ) {
            throw new Error( "The event date must be in the future." );
        }

        const createdEvent = await EventRepository.create( { title, date, email, userId } );
        return createdEvent;
    }

    static async list ( data: { email: string; userId: string; } ) {
        const { email, userId } = data;
        const events = await EventRepository.list( { email, userId } );
        return events;
    }

    static async find ( data: { eventId: string; email: string; userId: string; } ) {
        const { eventId, email, userId } = data;
        const event = await EventRepository.find( { eventId, email, userId } );

        if ( !event ) {
            throw new Error( "Event not found." );
        }

        return event;
    }

    static async update ( data: {
        eventId: string;
        email: string;
        userId: string;
        title: string;
        date: string;
    } ) {
        const { eventId, email, userId, title, date } = data;

        const event = await EventRepository.find( { eventId, email, userId } );
        if ( !event ) {
            throw new Error( "Event not found." );
        }

        if ( title && title.trim().length < 1 ) {
            throw new Error( "The title cannot be empty." );
        }

        if ( date && new Date( date ) <= new Date() ) {
            throw new Error( "The new event date must be in the future." );
        }

        const updatedEvent = await EventRepository.update( {
            eventId,
            email,
            userId,
            title,
            date,
        } );

        return updatedEvent;
    }

    static async delete ( data: { eventId: string; email: string; userId: string; } ) {
        const { eventId, email, userId } = data;
        const deleted = await EventRepository.delete( { eventId, email, userId } );

        if ( !deleted ) {
            throw new Error( "Event not found." );
        }

        return { message: "Event deleted successfully." };
    }
}