import { compare, hash } from 'bcryptjs';
export class User {
	private _password: string;
	constructor(private readonly _name: string, passwordHash?: string) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return await compare(pass, this._password);
	}
}

export interface UserModel {
	id: number;
	username: string;
	password: string;
	locksId: number[];
}
