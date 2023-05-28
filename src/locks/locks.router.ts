import { FastifyInstance } from 'fastify';
import { auth } from '../common/auth';
import { authGuard } from '../common/auth.guard';
import { locks, openLock, socket } from './locks.controller';
import { IParams } from './schemas/get.schema';

export const locksRouter = async (server: FastifyInstance): Promise<void> => {
	server.get('locks', { onRequest: auth, preHandler: authGuard }, locks);
	server.get<{ Params: IParams }>(':id/open', { onRequest: auth, preHandler: authGuard }, openLock);
	server.get('socket', { websocket: true }, socket);
};
