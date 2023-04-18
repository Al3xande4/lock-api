import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const authGuard = (req: FastifyRequest, res: FastifyReply, done: (err?: FastifyError) => void) => {
    if(req.user){
        return done();
    }
    res.status(401).send({message: "Unable to authenticate you.", code: 401});
    done();
}