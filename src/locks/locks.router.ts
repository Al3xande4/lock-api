import {FastifyInstance} from 'fastify';
import { auth } from '../common/auth';
import { authGuard } from '../common/auth.guard';
import { locks, openLock } from './locks.controller';
import { IParams } from './schemas/get.schema' 
import fastifyWebsocket from '@fastify/websocket';

export const locksRouter = async (server: FastifyInstance) => {
    server.register(fastifyWebsocket);

    server.addHook('onRequest', auth);
    server.addHook('preHandler', authGuard);

    server.get('locks', {websocket: true}, locks);
    server.get<{Params: IParams}>(':id/open', openLock);
};
