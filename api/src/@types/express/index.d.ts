/* eslint-disable */
import { Request, Response } from 'express-serve-static-core';
declare module 'express-serve-static-core' {
    interface Request {
        user: {
            userId: string;
            email: string;
        };
    }
}