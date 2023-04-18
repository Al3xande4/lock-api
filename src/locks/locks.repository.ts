import { locks } from "./locks"

export const getAll = () => {
    return locks;
};

export const get = (lockId: number) => {
    return locks.find(({id}) => {
        return id == lockId;
    });
};