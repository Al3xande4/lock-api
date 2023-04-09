import {FastifyInstance} from 'fastify';
import { login } from './login.controller';
import { UserLoginType, loginBody } from './login.schema';

export const loginRouter = async (server: FastifyInstance) => {
    await server.post<{Body: UserLoginType}>('/',
    {
        schema: loginBody
    }, login);
};