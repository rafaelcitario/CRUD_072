import { AuthRepository } from 'src/http/repositories/auth/auth.repository';
import { sendEmailVerification } from 'src/util/email/send.email';
import { implementJWTToken } from 'src/util/tokens/createToken.jwt';
import { validateToken } from 'src/util/tokens/validateToken.jwt';
import { isValidEmail } from 'src/util/validators/email.validator';
import { isValidPassword } from 'src/util/validators/password.validator';
import { createHash } from 'crypto';
import { stringify } from 'uuid';


export interface JWTReturnTokens {
    token: string,
    refresh_token: string;
}

export class AuthServices {
    static async login ( data: { email: string; password: string; } ): Promise<JWTReturnTokens> {
        const { email, password } = data;

        if ( !isValidEmail( email ) || !isValidPassword( password ) ) {
            throw new Error( 'Invalid credentials' );
        }
        const password_hash = createHash( 'sha512' )
            .update( password )
            .digest( 'base64url' );

        const [user] = await AuthRepository.userLogin( {
            email,
            password: password_hash,
        } );

        if ( !user || typeof user == 'undefined' || Object.values( user ).length <= 0 ) {
            throw new Error( 'Invalid credentials' );
        }

        const token = implementJWTToken( { userId: stringify( user.id as Buffer ), email: user.email }, 'token' );
        const refresh_token = implementJWTToken( { userId: stringify( user.id as Buffer ), email: user.email }, 'rf_token' );
        return { token, refresh_token };
    }
    static async register ( data: { email: string; password: string; } ): Promise<{ verificationLink: string; } & JWTReturnTokens> {
        const { email, password } = data;
        if ( !isValidEmail( email ) || !isValidPassword( password ) ) {
            throw new Error( 'Invalid credentials' );
        }
        const password_hash = createHash( 'sha512' )
            .update( password )
            .digest( 'base64url' );

        const [user] = await AuthRepository.userRegister( {
            email,
            password: password_hash,
        } );

        if ( !user || typeof user == 'undefined' || Object.values( user ).length <= 0 ) {
            throw new Error( 'Invalid credentials' );
        }

        const token = implementJWTToken( { userId: stringify( user.id as Buffer ), email: user.email }, 'token' );
        const refresh_token = implementJWTToken( { userId: stringify( user.id as Buffer ), email: user.email }, 'rf_token' );


        const link = 'http://127.0.0.1:5500/client/public/pages/greet.html';

        const verificationLink = await sendEmailVerification( { email, link } );
        return { token, refresh_token, verificationLink };
    }
    static async validateAccount ( token: string ): Promise<void> {
        const { userId, email } = await validateToken( token );
        if ( !userId || !email ) {
            throw new Error( 'Invalid token' );
        }
        await AuthRepository.validateEmailAccount( { userId, email } );
        return;
    }
    static async renewertoken ( data: { email: string; userId: string; } ) {
        const { email, userId } = data;
        if ( !userId || !email ) {
            throw new Error( 'Invalid token' );
        }
        const token = await implementJWTToken( { email, userId }, 'token' );
        const rf_token = await implementJWTToken( { email, userId }, 'rf_token' );
        await AuthRepository.renew( { userId, token } );
        return { refresh_token: rf_token };
    }
}
