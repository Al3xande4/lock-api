import { Type, Static } from "@sinclair/typebox";

export const getBody = Type.Object({
    id: Type.Number()
});
export interface IParams{
    id: number;
};

export type UserLoginType = Static<typeof getBody>; 