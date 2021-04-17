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
    return User.createBulk(this.usersCount);
  }

  private makeAccounts() {
    if (!this.users.length) {
      throw new Error('Users mock is empty, need to create users first');
    }

    return [...Array(this.accountsCount)].map((_, key) => {
      const randomUser = this.users[Math.floor(Math.random() * this.users.length)];
      return Account.create(randomUser.id);
    });
  }

  private makeInvoices() {
    if (!this.accounts.length) {
      throw new Error('Accounts mock is empty, need to create accounts first');
    }

    return [...Array(this.invoicesCount)].map((_, key) => {
      return Invoice.create();
    });
  }
}
