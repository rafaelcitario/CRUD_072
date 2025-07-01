import { _env } from '@src/env';
import jwt from 'jsonwebtoken';

enum TypeToken {
    TOKEN = 'token',
    RF_TOKEN = 'rf_token'
};
export function implementJWTToken ( payload: { userId: string, email: string; }, type: Required<Partial<'token' | 'rf_token'>> ) {
    const token = jwt.sign( payload, type != TypeToken.TOKEN ? _env.JWT_SECRET_RF_TOKEN : _env.JWT_SECRET_TOKEN, { algorithm: 'HS512', expiresIn: type != TypeToken.TOKEN ? _env.JWT_LIFETIME_RF_TOKEN : _env.JWT_LIFETIME_TOKEN } );
    return token;
}