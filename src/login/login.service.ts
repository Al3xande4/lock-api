import { find } from "./login.repository";
import { UserLoginType } from "./login.schema";
import { User } from "./user.entity";

export const validateUser = async ({username, password}: UserLoginType): Promise<boolean>=> {
    const existedUser = await find(username);
    if(!existedUser){
        return false;
    }
    const newUser = new User(existedUser.name, existedUser.password);
    return newUser.comparePassword(password);
};