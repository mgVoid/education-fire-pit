import type { ITimestamps, IHasId } from './General';

export interface IInvoice extends ITimestamps, IHasId {
  amount: number;
  isConfirmed: boolean;
  productDescription: string;
}
