import { EventsController } from '@src/http/controllers/events/events.controller';
import { verifyEmailMiddleware } from '@src/http/middlewares/verifyEmail.middleware';
import { Router } from 'express';

export const eventRoutes = Router();

eventRoutes.post( '/new', verifyEmailMiddleware, EventsController.create );
eventRoutes.get( '/all', verifyEmailMiddleware, EventsController.list );
eventRoutes.get( '/{:id}', verifyEmailMiddleware, EventsController.findOne );
eventRoutes.put( '/{:id}', verifyEmailMiddleware, EventsController.update );
eventRoutes.delete( '/{:id}', verifyEmailMiddleware, EventsController.delete );