import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

export const auth = (
	req: FastifyRequest,
	reply: FastifyReply,
	done: (err?: FastifyError) => void,
): void => {
	if (req.headers.authorization) {
		verify(
			req.headers.authorization.split(' ')[1],
			process.env.ACCESS_TOKEN as string,
			(err, payload) => {
				if (payload && typeof payload !== 'string') {
					req.user = payload.name;
					done();
				}
			},
		);
	}
	done();
};
