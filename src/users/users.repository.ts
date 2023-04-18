import { getRandomArrayElements, getRandomNumber } from "../utils/util";
import { User, UserModel } from "./user.entity";
import { users } from "./users";
let id = 0;

export const find = async (name: string): Promise<UserModel | undefined> => {
    return users.find(({username}) => username === name);
};

export const create = async ({name, password}: User) => {
    const locks = getRandomArrayElements([0, 1, 2, 3, 4, 5, 6, 7], getRandomNumber(1, 8));
    users.push({id: id, username: name, password: password, locksId: locks});
    id += 1;
}