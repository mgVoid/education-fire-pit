import type { IUser } from '../interfaces/User';
import type { IAccount } from '../interfaces/Account';
import type { IInvoice } from '../interfaces/Invoice';

import { User, Account, Invoice } from '../models';

interface IBuilder {
  makeDatabase: () => void;
}

export default class Builder implements IBuilder {
  private users: IUser[] = [];
  private accounts: IAccount[] = [];
  private invoices: Invoice[] = [];

  constructor(
    private usersCount: number = 10,
    private accountsCount: number = 20,
    private invoicesCount: number = 30
  ) {}

  public makeDatabase() {
    this.users = this.makeUsers();
    this.accounts = this.makeAccounts();
    this.invoices = this.makeInvoices();
  }

  private makeUsers() {
    console.log(`Making ${this.usersCount} users...`);
    return User.createBulk(this.usersCount);
  }

  private makeAccounts() {
    if (!this.users.length) {
      throw new Error('Users mock is empty, need to create users first');
    }

    console.log(`Making ${this.accountsCount} accounts...`);
    const usersIds = this.users.map((user) => user.id);
    return Account.createBulk(this.accountsCount, usersIds);
  }

  private makeInvoices() {
    if (!this.accounts.length) {
      throw new Error('Accounts mock is empty, need to create accounts first');
    }

    console.log(`Making ${this.invoicesCount} invoices...`);
    const accountsIds = this.accounts.map((account) => account.id);
    return Invoice.createBulk(this.invoicesCount, accountsIds);
  }
}
