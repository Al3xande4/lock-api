import { LockModel } from './lock.entity';
import { locks } from './locks';

export const getAll = (): LockModel[] => {
	return locks;
};

export const get = (lockId: number): LockModel | undefined => {
	return locks.find(({ id }) => {
		return id == lockId;
	});
};
