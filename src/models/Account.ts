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

  static async createBulk(count: number, usersIds: string[]) {
    const accounts: IAccount[] = [...Array(count)].map(() => {
      const randomUserId = usersIds[Math.floor(Math.random() * usersIds.length)];

      return new this(randomUserId);
    });

    await orm.writeToDatabase(Databases.ACCOUNTS, accounts);
    return accounts;
  }

  static async getUserAccounts(userId: string): Promise<IAccount[]> {
    const { accounts } = await orm.readDatabase();
    return accounts.filter((account) => account.userId === userId);
  }
}
