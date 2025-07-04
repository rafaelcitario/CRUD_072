import { EventsController } from 'src/http/controllers/events/events.controller';
import { tokenMiddlewareVerification } from 'src/http/middlewares/tokenVerification.middleware';
import { Router } from 'express';

export const eventRoutes = Router();

eventRoutes.post( '/new', tokenMiddlewareVerification, EventsController.create );
eventRoutes.get( '/all', tokenMiddlewareVerification, EventsController.list );
eventRoutes.get( '/{:id}', tokenMiddlewareVerification, EventsController.findOne );
eventRoutes.put( '/{:id}', tokenMiddlewareVerification, EventsController.update );
eventRoutes.delete( '/{:id}', tokenMiddlewareVerification, EventsController.delete );