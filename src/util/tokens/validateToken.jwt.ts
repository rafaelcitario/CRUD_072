import { _env } from '@src/env';
import jwt, { JwtPayload } from 'jsonwebtoken';


export async function validateToken ( token: string ): Promise<{ userId: string, email: string; }> {
    try {
        const decode = await jwt.verify( token, _env.JWT_SECRET_TOKEN ) as JwtPayload;
        if ( !decode || typeof decode != 'object' ) {
            throw new Error( 'Invalid token payload' );
        }

        const { userId, email } = decode;
        if ( !userId || !email ) {
            throw new Error( 'Invalid token payload' );
        }

        return { userId, email };
    } catch {
        throw new Error( 'Invalid token or expired' );
    }
}