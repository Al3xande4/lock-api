import { writeFile } from "fs";
import { User, UserModel } from "./user.entity";
import users from './users.json';

export const find = async (name: string): Promise<UserModel | undefined> => {
    const userList = users as Array<UserModel>;
    const res =  userList.find(({username}) => username === name)
    console.log(res);
    return res;
};

export const create = async ({name, password}: User) => {
    const userList = users as Array<UserModel>;
    userList.push({username: name, password: password});
    writeFile('./users.json', JSON.stringify(userList), 'utf-8', (err) => {
        if (err){
            console.log(err);
            return;
        }
    });
}