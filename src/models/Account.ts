import faker from 'faker';

import type { IAccount } from '../interfaces/Account';
import type { IInvoice } from '../interfaces/Invoice';

import Dates from './Dates';

interface IAccountClass {}

export default class Account extends Dates implements IAccount, IAccountClass {
  constructor(
    public userId: string,
    public id: string = faker.datatype.uuid(),
    public balance: number = faker.datatype.float(),
    public invoices: IInvoice[] = []
  ) {
    super();
  }

  static create(userId: string) {
    const account = new this(userId);
    // idedam i duomenu baze nauja irasa

    return account;
  }
}
