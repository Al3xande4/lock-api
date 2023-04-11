import { UserModel } from "./user.entity";
import users from './users.json';

export const find = async (name: string): Promise<UserModel | undefined> => {
    const userList = users as Array<UserModel>;
    const res =  userList.find(({username}) => username === name)
    return res;
};