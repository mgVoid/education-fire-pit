import type { IUser } from '../interfaces/User';
import type { IAccount } from '../interfaces/Account';
import type { IInvoice } from '../interfaces/Invoice';

interface IBuilder {
  makeUsers: () => IUser[];
  makeAccounts: (count: number) => IAccount[];
  makeInvoices: (count: number) => IInvoice[];
}

export default class Builder implements IBuilder {
  constructor(private count: number = 10) {}

  public makeUsers() {}

  public makeAccounts() {}

  public makeInvoices() {}
}
