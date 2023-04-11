import { find } from "./users.repository";
import { UserLoginType } from "./shemas/login.schema";
import { User, UserModel } from "./user.entity";
import { UserRegisterType } from "./shemas/register.schema";
import users from "./users.json";
import { writeFile } from "fs";

export const validateUser = async ({username, password}: UserLoginType): Promise<boolean>=> {
    const existedUser = await find(username);
    if(!existedUser){
        return false;
    }
    const newUser = new User(existedUser.username, existedUser.password);
    return await newUser.comparePassword(password);
};

export const createUser = async ({username, password}: UserRegisterType): Promise<boolean> => {
    const newUser = new User(username);
    await newUser.setPassword(password, Number(process.env.SALT));
    const existedUser = await find(username);
    if (existedUser){
        return false;
    }
    const userList = users as Array<UserModel>;
    userList.push({username: newUser.name, password: newUser.password});
    writeFile('./users.json', JSON.stringify(userList), 'utf-8', (err) => {
        if (err){
            console.log(err);
            return;
        }
    });
    return true;
}