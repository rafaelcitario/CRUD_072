import { CustomerRepository } from '@src/http/repositories/customers/customers.repository';

export class CustomerServices {
    static async list ( data: { userId: string, email: string; } ) {
        const { userId, email } = data;
        if ( !userId || !email ) {
            throw new Error( 'Invalid credencials' );
        }
        const customers = await CustomerRepository.list( { userId, email } );
        return customers;
    }
}