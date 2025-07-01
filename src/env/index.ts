import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object( {
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string().default( 'localhost' ),
    SERVER_PORT: z.coerce.number().default( 3000 ),
    JWT_SECRET_TOKEN: z.string(),
    JWT_SECRET_RF_TOKEN: z.string(),
    JWT_LIFETIME_TOKEN: z.coerce.number().default( 900 ),
    JWT_LIFETIME_RF_TOKEN: z.coerce.number().default( 604800 )
} );


const parsedEnv = envSchema.safeParse( process.env );

if ( !parsedEnv.success ) {
    throw new Error( 'We\'ve some problem with environment variables.' );
}
export const _env = parsedEnv.data;