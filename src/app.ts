import fastify from "fastify";
import { loginRouter } from "./users/users.router";
import dotenv from 'dotenv';


const init = async () => {
    const server = fastify({
        logger: false,
    });
    
    dotenv.config();
    server.register(loginRouter, {prefix: '/api/'})

    server.listen({port: 4010}, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    });
};

init();
