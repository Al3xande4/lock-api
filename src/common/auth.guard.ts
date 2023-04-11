import { FastifyReply, FastifyRequest } from "fastify";

export const authGuard = (req: FastifyRequest, res: FastifyReply) => {
    if(req.user){
        return;
    }
    res.status(401).send({ err: {message: "User is not authorized", code: 401}})
}