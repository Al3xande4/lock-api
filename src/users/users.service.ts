import { create, find } from "./users.repository";
import { UserLoginType } from "./shemas/login.schema";
import { User, UserModel } from "./user.entity";
import { UserRegisterType } from "./shemas/register.schema";

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
    create(newUser);
    return true;
}