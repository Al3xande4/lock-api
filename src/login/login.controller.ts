import {FastifyRequest, FastifyReply} from 'fastify'
import { UserLoginType } from './login.schema';
import { validateUser } from './login.service';
import { sign } from 'jsonwebtoken';

export const login = async (req: FastifyRequest<{Body: UserLoginType}>, res: FastifyReply) => {
    console.log('login')
    const result = await validateUser(req.body);
    if(!result){
        console.log('bad')
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