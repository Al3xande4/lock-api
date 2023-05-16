import fastify from "fastify";
import { loginRouter } from "./users/users.router";
import dotenv from 'dotenv';
import { locksRouter } from "./locks/locks.router";
import fastifyWebsocket from "@fastify/websocket";
import fastifyCors from "@fastify/cors";

const init = async () => {
    dotenv.config();
    const server = fastify({
        logger: false,
    });
    server.register(fastifyWebsocket);
    server.register(fastifyCors, {
        origin: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type'], // Allowed headers
    });
    server.register(loginRouter, {prefix: '/api/'});
    server.register(locksRouter, {prefix: '/api/'});
    server.listen({port: 4010}, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    });
};

init();
