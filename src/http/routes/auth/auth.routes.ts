import { loginController } from '@src/http/controllers/auth/login/login.controller';
import { registerController } from '@src/http/controllers/auth/register/register.controller';
import { emailMiddleware } from '@src/http/middlewares/email.middleware';
import { isValidRegisterPayload } from '@src/http/middlewares/registerPayload.middleware';
import { Router } from 'express';
export const authRoutes = Router();


authRoutes.get( '/login', emailMiddleware, loginController );

authRoutes.get( '/register', isValidRegisterPayload, registerController );

authRoutes.get( '/verify_email', () => { } );