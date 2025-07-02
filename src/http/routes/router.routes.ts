import { Router } from 'express';
import { authRoutes } from './auth/auth.routes';
import { eventRoutes } from './events/events.routes';

export const router = Router();

router.use( '/auth', authRoutes );
router.use( '/events', eventRoutes );