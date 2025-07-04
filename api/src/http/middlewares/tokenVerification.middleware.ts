import { validateToken } from 'src/util/tokens/validateToken.jwt';
import { NextFunction, Request, Response } from 'express';

export async function tokenMiddlewareVerification ( req: Request, res: Response, next: NextFunction ): Promise<void> {
    const auth = req.headers.authorization;
    const token = auth?.split( ' ' )[1];
    if ( !token ) {
        res.status( 401 ).json( { error: 'Invalid token or expired' } );
        return;
    }

    try {
        const { email, userId } = await validateToken( token );
        req.user = { email, userId };
        next();
    } catch {
        res.status( 401 ).json( { error: 'Invalid token or expired' } );
        return;
    }
}