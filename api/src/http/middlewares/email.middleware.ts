import { NextFunction, Request, Response } from 'express';
import { isValidEmail } from '../../util/validators/email.validator';

export function emailMiddleware ( req: Request<unknown, unknown, { email: string; }>, res: Response, next: NextFunction ): void {
    const { email } = req.body;
    if ( !isValidEmail( email ) ) {
        res.status( 400 ).json( {
            error: 'Email is invalid data, verify and try again.',
        } );
        return;
    }
    next();
    return;
}