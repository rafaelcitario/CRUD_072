import { AuthServices } from '@src/http/services/auth/auth.service';
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
                res.status( 400 ).json( { error: "Invalid email or password" } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    };

    static register ( req: Request<unknown, unknown, { email: string, password: string; }>, res: Response ) {
        const { email, password } = req.body;
        try {
            // await AuthServices.login( { email, password } );
            // res.status( 200 ).send( 'Login was a successfuly' );
        } catch ( e ) {
            // if ( e instanceof Error && e.message === 'Invalid credentials' ) {
            //     res.status( 400 ).json( { error: "Invalid email or password" } );
            //     return;
            // }
            // res.status( 500 ).json( { error: 'Internal server error' } );
            // return;
        }
    }

    static verifyEmail ( req: Request<unknown, unknown, { email: string, password: string; }>, res: Response ) {
        const { email, password } = req.body;
        try {
            // await AuthServices.login( { email, password } );
            // res.status( 200 ).send( 'Login was a successfuly' );
        } catch ( e ) {
            // if ( e instanceof Error && e.message === 'Invalid credentials' ) {
            //     res.status( 400 ).json( { error: "Invalid email or password" } );
            //     return;
            // }
            // res.status( 500 ).json( { error: 'Internal server error' } );
            // return;
        }
    }
}