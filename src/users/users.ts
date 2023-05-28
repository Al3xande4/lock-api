import { UserModel } from './user.entity';

export const users: UserModel[] = [
    {
        id: 0,
        username: "admin",
        password: "$2a$10$aVcrly01ZoUp0HPhkE34Ze2wVr2B0kGlGYAegq9eSohyf.TZHzWcG", // admin
        locksId: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
        id: 1,
        username: "user",
        password: "$2a$10$ZEiIUoPO1iYG.x/5SC5DsuXPmE27r/QzE1e5Sqig0iHAY.pQAhhvW", // 123
        locksId: [0, 2, 5, 6],
    },
];
