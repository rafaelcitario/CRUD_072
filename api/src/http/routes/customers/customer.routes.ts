import { Router } from 'express';
import { tokenMiddlewareVerification } from 'src/http/middlewares/tokenVerification.middleware';
import { CustomerController } from 'src/http/controllers/customers/customers.controller';

export const customerRoutes = Router();

customerRoutes.get( '/users', tokenMiddlewareVerification, CustomerController.list );