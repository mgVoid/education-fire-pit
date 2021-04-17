import type { ITimestamps, IHasId } from './General';
import type { IAccount } from './Account';

export interface IInvoice extends ITimestamps, IHasId {
  amount: number;
  isConfirmed: boolean;
  productDescription: string;
  accountId: IAccount['id'];
}
