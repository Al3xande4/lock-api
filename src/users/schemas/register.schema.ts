import { Type, Static } from '@sinclair/typebox';

export const registerBody = Type.Object({
	username: Type.String(),
	password: Type.String(),
});

export type UserRegisterType = Static<typeof registerBody>;
