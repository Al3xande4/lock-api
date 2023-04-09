import { User } from "./user.entity";

export const find = async (username: string): Promise<User> => {
    // returns users by username;
    return new User('');
};