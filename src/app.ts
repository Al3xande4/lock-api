import fastify from "fastify";
import { loginRouter } from "./login/login.router";
import dotenv from 'dotenv';


const init = async () => {
    const server = fastify({
        logger: true,
    });
    
    dotenv.config();
    server.register(loginRouter, {prefix: '/api/login'})

    server.listen({port: 4010}, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    });
};

init();
