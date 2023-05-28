import { Type, Static } from '@sinclair/typebox';

export const loginBody = Type.Object({
	username: Type.String(),
	password: Type.String(),
});

export type UserLoginType = Static<typeof loginBody>;
