import { FastifyReply, FastifyRequest } from 'fastify';
import { find } from '../users/users.repository';
import { get } from './locks.repository';
import { IParams } from './schemas/get.schema';
import { SocketStream } from '@fastify/websocket';

let ws: WebSocket;
export const locks = async (req: FastifyRequest, res: FastifyReply) => {
	const user = await find(req.user);
	if (!user) {
		res.status(400).send({ error: 400, message: 'No such user' });
		return;
	}
	if (!user.locksId) {
		return 'No locks are available';
	}
	const locksAvailable = [];
	if (!user.locksId) {
		return;
	}
	for (const id of user.locksId) {
		locksAvailable.push(get(id));
	}
	return locksAvailable;
};

export const openLock = async (req: FastifyRequest<{ Params: IParams }>, res: FastifyReply) => {
	const lock = await get(req.params.id);
	if (!lock) {
		res.status(404).send({ message: `No such door with id ${req.params.id}.`, code: 404 });
		return;
	}
	const user = await find(req.user);
	if (!user) {
		res.status(404).send({ message: 'No such user', code: 404 });
		return;
	}

	if (
		!user.locksId.find((el) => {
			return el == req.params.id;
		})
	) {
		res.status(400).send({ message: "You don't have access to open this door.", code: 400 });
		return;
	}
	lock.isLocked = false;
	ws.send(JSON.stringify(lock.id));
	return { message: 'Door has been successfully opened', done: true };
};

export const socket = async (connection: SocketStream, req: FastifyRequest): Promise<void> => {
	ws = connection.socket;
};
