import type { ITimestamps, IHasId } from './General';

export interface IAccount extends ITimestamps, IHasId {
  balance: number;
}
