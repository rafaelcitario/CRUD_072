import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user: {
            userId: string;
            email: string;
        };
    }
}