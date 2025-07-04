import { v7, parse } from 'uuid';

export function generateBinaryID (): Buffer {
    const binayId = Buffer.from( parse( v7() ) );
    return binayId;
}