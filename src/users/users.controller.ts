import {FastifyRequest, FastifyReply} from 'fastify'
import { UserLoginType } from './shemas/login.schema';
import { createUser, validateUser } from './users.service';
import { sign } from 'jsonwebtoken';
import { UserRegisterType } from './shemas/register.schema';

export const register = async (req: FastifyRequest<{Body: UserRegisterType}>, res: FastifyReply) => {
    if(await createUser(req.body)){
        res.status(200).send()
    };
};

export const login = async (req: FastifyRequest<{Body: UserLoginType}>, res: FastifyReply) => {
    const result = await validateUser(req.body);
    if(!result){
        res.status(400).send()
        return;
    };
    const jwt = await singJWT(req.body.username, process.env.ACCESS_TOKEN as string);
    return {jwt};
};

const singJWT = (name: string, secret: string) => {
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
                console.log('cool')
                if(err){
                    reject(err);
                }
                resolve(token as string);
            }
        )
    })
}