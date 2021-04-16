import type { ITimestamps, IHasId } from './General';
import type { IAccount } from './Account';

export enum CustomerType {
  BUSINESS = 'business',
  PERSONAL = 'personal',
}
export interface IUser extends ITimestamps, IHasId {
  name: string;
  customerType: CustomerType;
  accounts: IAccount[];
}
