import { FastifyRequest, FastifyReply } from 'fastify';
import { UserLoginType } from './schemas/login.schema';
import { createUser, validateUser } from './users.service';
import { sign } from 'jsonwebtoken';
import { UserRegisterType } from './schemas/register.schema';

export const register = async (
	req: FastifyRequest<{ Body: UserRegisterType }>,
	res: FastifyReply,
): Promise<void> => {
	if (await createUser(req.body)) {
		res.status(200).send(JSON.stringify({ message: 'User has been created' }));
	}
	res.status(400).send(JSON.stringify({ error: 400, message: 'Could create a user' }));
};

export const login = async (req: FastifyRequest<{ Body: UserLoginType }>, res: FastifyReply) => {
	const result = await validateUser(req.body);
	if (!result) {
		res.status(400).send(JSON.stringify({ error: 400, message: 'password is wrong' }));
	}
	const jwt = await singJWT(req.body.username, process.env.ACCESS_TOKEN as string);
	return { jwt };
};

const singJWT = (name: string, secret: string): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		sign(
			{
				name,
				iat: Math.floor(Date.now() / 1000),
			},
			secret,
			{
				algorithm: 'HS256',
			},
			(err, token) => {
				if (err) {
					reject(err);
				}
				resolve(token as string);
			},
		);
	});
};
