import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object( {
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string().default( 'localhost' )
} );


const parsedEnv = envSchema.safeParse( process.env );

if ( !parsedEnv.success ) {
    throw new Error( 'We\'ve some problem with environment variables.' );
}
export const _env = parsedEnv.data;