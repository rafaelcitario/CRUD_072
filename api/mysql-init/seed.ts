import { _env } from 'src/env';
import { generateBinaryID } from 'src/util/generate_binaryId';
import { createHash } from 'crypto';
import { createConnection } from 'mysql2/promise';

( async function () {
    const cnn = await createConnection( {
        host: _env.DB_HOST,
        user: _env.DB_USER,
        database: _env.DB_NAME,
        password: _env.DB_PASSWORD,
    } );


    const users = [
        { email: 'ana.silva@example.com', password: 'Aa1!2b3@' },
        { email: 'carlos.souza@example.com', password: 'Xx2#4D5$' },
        { email: 'mariana.lima@example.com', password: 'Qq3%6f7^' },
        { email: 'joao.pereira@example.com', password: 'Zz4&8H1*' },
        { email: 'fernanda.alves@example.com', password: 'Kk5!3j2@' },
        { email: 'lucas.oliveira@example.com', password: 'Mm6#7P4$' },
        { email: 'beatriz.costa@example.com', password: 'Rr7%2v5^' },
        { email: 'rafael.ribeiro@example.com', password: 'Tt8&1L6*' },
        { email: 'patricia.martins@example.com', password: 'Pp9!4s3@' },
        { email: 'rodrigo.gomes@example.com', password: 'Vv0#5N7$' },
        { email: 'juliana.santos@example.com', password: 'Aa2!3b4@' },
        { email: 'andre.fernandes@example.com', password: 'Xx3#5D6$' },
        { email: 'camila.rocha@example.com', password: 'Qq4%7f8^' },
        { email: 'felipe.barros@example.com', password: 'Zz5&1H2*' },
        { email: 'gabriela.moura@example.com', password: 'Kk6!4j3@' },
        { email: 'marcos.cardoso@example.com', password: 'Mm7#8P5$' },
        { email: 'larissa.borges@example.com', password: 'Rr8%3v6^' },
        { email: 'thiago.azevedo@example.com', password: 'Tt9&2L7*' },
        { email: 'aline.freitas@example.com', password: 'Pp0!5s4@' },
        { email: 'gustavo.nunes@example.com', password: 'Vv1#6N8$' },
        { email: 'elaine.mendes@example.com', password: 'Aa3!4b5@' },
        { email: 'bruno.teixeira@example.com', password: 'Xx4#6D7$' },
        { email: 'viviane.campos@example.com', password: 'Qq5%8f1^' },
        { email: 'pedro.vieira@example.com', password: 'Zz6&2H3*' },
        { email: 'priscila.pinto@example.com', password: 'Kk7!5j4@' },
        { email: 'vinicius.araujo@example.com', password: 'Mm8#9P6$' },
        { email: 'renata.simoes@example.com', password: 'Rr9%4v7^' },
        { email: 'eduardo.farias@example.com', password: 'Tt0&3L8*' },
        { email: 'amanda.batista@example.com', password: 'Pp1!6s5@' },
        { email: 'ricardo.machado@example.com', password: 'Vv2#7N1$' },
        { email: 'sabrina.miranda@example.com', password: 'Aa4!5b6@' },
        { email: 'mateus.dias@example.com', password: 'Xx5#7D8$' },
        { email: 'tais.ramos@example.com', password: 'Qq6%9f2^' },
        { email: 'henrique.castro@example.com', password: 'Zz7&3H4*' },
        { email: 'carla.moreira@example.com', password: 'Kk8!6j5@' },
        { email: 'adriano.lopes@example.com', password: 'Mm9#1P7$' },
        { email: 'paula.sousa@example.com', password: 'Rr0%5v8^' },
        { email: 'fabio.fonseca@example.com', password: 'Tt1&4L1*' },
        { email: 'luana.cavalcante@example.com', password: 'Pp2!7s6@' },
        { email: 'sergio.melo@example.com', password: 'Vv3#8N2$' },
        { email: 'monique.mattos@example.com', password: 'Aa5!6b7@' },
        { email: 'joana.reis@example.com', password: 'Xx6#8D1$' },
        { email: 'alexandre.viana@example.com', password: 'Qq7%1f3^' },
        { email: 'lilian.guimaraes@example.com', password: 'Zz8&4H5*' },
        { email: 'renan.paiva@example.com', password: 'Kk9!7j6@' },
        { email: 'debora.silveira@example.com', password: 'Mm0#2P8$' },
        { email: 'claudio.coelho@example.com', password: 'Rr1%6v1^' },
        { email: 'isabela.torres@example.com', password: 'Tt2&5L2*' },
        { email: 'diego.monteiro@example.com', password: 'Pp3!8s7@' },
        { email: 'luciana.andrade@example.com', password: 'Vv4#9N3$' }
    ];


    try {
        await cnn.beginTransaction();
        for ( const user of users ) {
            const userId = generateBinaryID();
            const envetId = generateBinaryID();

            const hash = createHash( 'sha512' );
            const password_hash = hash.update( user.password ).digest( 'base64url' );

            await cnn.execute(
                `INSERT INTO 
                users (id, email, password_hash, is_valid_email)
                VALUES (?, ?, ?, ?)`,
                [
                    userId,
                    user.email,
                    password_hash,
                    1
                ]
            );

            await cnn.execute(
                `INSERT INTO 
                events (id, title, event_date, is_expired, user_id)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    envetId,
                    `Evento de ${user.email}`,
                    '2025-06-30',
                    new Date() > new Date( '2025-06-30' ) ? 1 : 0,
                    userId
                ]
            );
        }

        await cnn.commit();
        console.log( '🌱 Seed succefuly' );
    } catch ( err ) {
        await cnn.rollback();
        const typedError = err as Error;
        throw new Error( `Database Rollback, error to populate with seed\n ${typedError.stack}` );
    } finally {
        await cnn.end();
    }
} )().catch( ( err ) => {
    const typedError = err as Error;
    throw new Error( `Error to populate database\n ${typedError.stack}` );
} );