import {FastifyInstance} from 'fastify';
import { login, register } from './users.controller';
import { UserLoginType, loginBody } from './schemas/login.schema';
import { UserRegisterType, registerBody } from './schemas/register.schema';

export const loginRouter = async (server: FastifyInstance) => {
    await server.post<{Body: UserLoginType}>('/login',
    {
        schema: loginBody
    }, login);
    await server.post<{Body: UserRegisterType}>('/register',
    {
        schema: registerBody
    }, register)
};