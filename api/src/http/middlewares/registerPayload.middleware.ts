import { isValidEmail } from 'src/util/validators/email.validator';
import { isValidPassword } from 'src/util/validators/password.validator';
import { NextFunction, Request, Response } from 'express';

export function isValidRegisterPayload ( req: Request<unknown, unknown, { email: string, password: string; }>, res: Response, next: NextFunction ): void {
    const { email, password } = req.body;
    if ( !isValidPassword( password ) ) {
        res.status( 400 ).json( {
            error: 'Invalid password format'
        } );
        return;
    }

    if ( !isValidEmail( email ) || password.length <= 0 ) {
        res.status( 400 ).json( { error: 'Email or password is missing.' } );
        return;
    }
    next();
    return;
}