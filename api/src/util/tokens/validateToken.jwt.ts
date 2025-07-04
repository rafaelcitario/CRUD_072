import { _env } from 'src/env';
import jwt, { JwtPayload } from 'jsonwebtoken';


export async function validateToken ( token: string ): Promise<{ userId: string, email: string; }> {
    let decode: string | JwtPayload | null = null;

    try {
        decode = jwt.verify( token, _env.JWT_SECRET_TOKEN ) as JwtPayload;
    } catch ( err ) {
        if ( err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError ) {
            try {
                decode = jwt.verify( token, _env.JWT_SECRET_RF_TOKEN ) as JwtPayload;
            } catch {
                throw new Error( 'Invalid token or expired.' );
            }
        } else {
            throw err;
        }
    }

    if ( !decode || typeof decode !== 'object' ) {
        throw new Error( 'Invalid token payload.' );
    }

    const { userId, email } = decode;
    if ( !userId || !email ) {
        throw new Error( 'Invalid token payload.' );
    }

    console.log( decode );
    return { userId, email };
}