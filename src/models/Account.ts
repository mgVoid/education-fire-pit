import faker from 'faker';

import type { IAccount } from '../interfaces/Account';
import type { IInvoice } from '../interfaces/Invoice';
import { Databases } from '../interfaces/General';

import Dates from './Dates';
import { orm } from './';

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
    return new this(userId);
  }

  static createBulk(count: number, usersIds: string[]) {
    const accounts: IAccount[] = [...Array(count)].map((_, key) => {
      const randomUserId = usersIds[Math.floor(Math.random() * usersIds.length)];

      return new this(randomUserId);
    });

    orm.writeToDatabase(Databases.ACCOUNTS, accounts);
    return accounts;
  }
}
