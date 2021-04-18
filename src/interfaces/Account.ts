import type { ITimestamps, IHasId } from './General';
import type { IUser } from './User';
import type { IInvoice } from './Invoice';

export interface IAccount extends ITimestamps, IHasId {
  userId: IUser['id'];
  balance: number;
  invoices: IInvoice[];
}
