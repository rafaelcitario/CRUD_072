import app from '@src/app/app';
import { _env } from './env';

app.listen( _env.SERVER_PORT, ( e ) => {
    if ( e ) {
        throw new Error( `Server error: ${e}` );
    }
    console.log( `Server is running at port: ${_env.SERVER_PORT}` );
} );