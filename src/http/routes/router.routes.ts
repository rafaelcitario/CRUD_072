import { Router } from 'express';
import { authRoutes } from './auth/auth.routes';
import { eventRoutes } from './events/events.routes';
import { customerRoutes } from './customers/customer.routes';

export const router = Router();

router.use( '/', customerRoutes );
router.use( '/auth', authRoutes );
router.use( '/events', eventRoutes );