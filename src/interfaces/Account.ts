import type { ITimestamps, IHasId } from './General';
import type { IUser } from './User';

export interface IAccount extends ITimestamps, IHasId {
  userId: IUser['id'];
  balance: number;
}
