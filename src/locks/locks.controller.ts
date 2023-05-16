import { FastifyReply, FastifyRequest } from "fastify";
import { find } from "../users/users.repository";
import { get } from "./locks.repository";
import { IParams } from "./schemas/get.schema";
import { SocketStream } from "@fastify/websocket";

export const locks = async (connection: SocketStream, req: FastifyRequest) => {
    connection.socket.on('message', (message: string) => {
        // Handle incoming messages
        console.log('Received message:', message);
    });
    const user = await find(req.user);
    if(!user){
        connection.socket.send({message: "No such user"});
        return;
    }
    if(!user.locksId){
        return "No locks are available";
    }
    const locksAvailable = [];
    for(const id of user?.locksId){
        locksAvailable.push(get(id));
    };
    connection.socket.send(locksAvailable)
};

export const openLock = async (req: FastifyRequest<{Params: IParams}>, res: FastifyReply) => {
    const lock = await get(req.params.id);
    if(!lock){
        res.status(404).send({message: `No such door with id ${req.params.id}.`, code: 404});
        return;
    };
    const user = await find(req.user);
    if(!user){
        res.status(404).send({message: "No such user", code: 404});
        return;
    }

    if (!user.locksId.find((el) => {return el == req.params.id})){
        res.status(400).send({message: "You don't have access to open this door.", code: 400});
        return;
    }
    lock.isLocked = false;
    return {message: "Door has been successfully opened", done: true};
};
