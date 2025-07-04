import { AuthServices } from 'src/http/services/auth/auth.service';
import { Request, Response } from 'express';

export class AuthController {
    static async login ( req: Request<unknown, unknown, { email: string, password: string; }>, res: Response ) {
        const { email, password } = req.body;
        try {
            const tokens = await AuthServices.login( { email, password } );
            const code = 200;
            res.status( code ).json( { code, status: 'Login successfuly', tokens } );
        } catch ( e ) {
            if ( e instanceof Error && e.message === 'Invalid credentials' ) {
                res.status( 400 ).json( { error: 'Invalid email or password' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    };

    static async register ( req: Request<unknown, unknown, { email: string, password: string; }>, res: Response ) {
        const { email, password } = req.body;
        try {
            const tokens = await AuthServices.register( { email, password } );
            const code = 201;
            res.status( code ).json( { code, status: 'Register successfuly', tokens } );
        } catch ( e ) {
            if ( e instanceof Error && e.message === 'Invalid credentials' ) {
                res.status( 400 ).json( { error: 'Invalid email or password' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    }

    static async verifyEmail ( req: Request<unknown, unknown, unknown, { token: string; }>, res: Response ) {
        const { token } = req.query;
        try {
            const tokens = await AuthServices.validateAccount( token );
            const code = 200;
            res.status( 200 ).json( { code, status: 'Validation successfuly', tokens } );
        } catch ( e ) {
            if ( e instanceof Error && e.message === 'Invalid token' ) {
                res.status( 400 ).json( { error: 'Invalid token or expired' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    }
}