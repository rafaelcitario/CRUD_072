import { AuthRepository } from '@src/http/repositories/auth/auth.repository';
import { implementJWTToken } from '@src/util/tokens/createToken.jwt';
import { isValidEmail } from '@src/util/validators/email.validator';
import { isValidPassword } from '@src/util/validators/password.validator';
import { createHash } from 'crypto';
import { stringify } from 'uuid';

export class AuthServices {
    static async login ( data: { email: string; password: string; } ): Promise<{ token: string, refresh_token: string; }> {
        const { email, password } = data;

        if ( !isValidEmail( email ) || !isValidPassword( password ) ) {
            throw new Error( 'Invalid credentials' );
        }
        const password_hash = createHash( 'sha512' )
            .update( password )
            .digest( 'base64url' );

        const [user] = await AuthRepository.login( {
            email,
            password: password_hash,
        } );

        if ( !user || typeof user == undefined || Object.values( user ).length <= 0 ) {
            throw new Error( 'Invalid credentials' );
        }

        const token = implementJWTToken( { userId: stringify( user.id as Buffer ), email: user.email }, 'token' );
        const refresh_token = implementJWTToken( { userId: stringify( user.id as Buffer ), email: user.email }, 'rf_token' );
        return { token, refresh_token };
    }
}
