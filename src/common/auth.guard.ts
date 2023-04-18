import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const authGuard = (req: FastifyRequest, res: FastifyReply, done: (err?: FastifyError) => void) => {
    if(req.user){
        return done();
    }
    res.status(401).send({ err: {message: "User is not authorized", code: 401}});
    done();
}