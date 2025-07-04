import { CustomerServices } from 'src/http/services/customers/customers.service';
import { Request, Response } from 'express';

export class CustomerController {
    static async list ( req: Request<unknown, unknown, { userId: string, email: string; }>, res: Response ) {
        const { email, userId } = req.user!;
        try {
            const customers = await CustomerServices.list( { email, userId } );
            const code = 200;
            res.status( code ).json( customers );
            return;
        } catch ( e ) {
            if ( e instanceof Error && e.message === 'Invalid credencials' ) {
                res.status( 401 ).json( { error: e.message, message: 'Unauthorized to access this service' } );
                return;
            }
            res.status( 500 ).json( { error: 'Internal server error' } );
            return;
        }
    }
}