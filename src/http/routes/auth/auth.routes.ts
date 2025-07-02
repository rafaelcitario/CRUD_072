
import { AuthController } from '@src/http/controllers/auth/auth.controller';
import { emailMiddleware } from '@src/http/middlewares/email.middleware';
import { isValidRegisterPayload } from '@src/http/middlewares/registerPayload.middleware';
import { Router } from 'express';
export const authRoutes = Router();

authRoutes.post( '/login', emailMiddleware, AuthController.login );
authRoutes.post( '/register', isValidRegisterPayload, AuthController.register );
authRoutes.get( '/verify_email{:token}', AuthController.verifyEmail );