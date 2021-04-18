import faker from 'faker';

import { IUser, CustomerType } from '../interfaces/User';
import { Databases } from '../interfaces/General';
import type { IAccount } from '../interfaces/Account';

import Dates from './Dates';
import Account from './Account';
import Invoice from './Invoice';
import { orm } from './';

interface IUserClass {}

export default class User extends Dates implements IUser, IUserClass {
  constructor(
    public id: string = faker.datatype.uuid(),
    public name: string = faker.name.findName(),
    public customerType: CustomerType = faker.random.arrayElement(Object.values(CustomerType)),
    public accounts: IAccount[] = []
  ) {
    super();

    // check if database file was created and create one if not
  }

  // Objekto sukurimui naudojam statini metoda, o ne tiesiog kur reik sukurti rasom: `new User()`
  // Del labai paprastos priezasties: Kai bus naudojamos duomenu bazes, kad sukurti irasa, mes turesim naudoti asinchroninius metodus
  // Tokiu atveju jau mes negalesim naudoti konstruktoriaus ir reikes statinio metodo
  // Kuris sukuria duomenu bazeje irasa ir tada jau mums grazina nauja klases objekta
  // Todel ir cia stengiames laikytis to conventiono, kad priprastumet
  static create() {
    const user = new this();
    // idedam i duomenu baze nauja irasa

    return user;
  }

  static async createBulk(count: number) {
    const users: IUser[] = [...Array(count)].map((_, key) => {
      return new this();
    });

    // idedam i duomenu baze
    await orm.writeToDatabase(Databases.USERS, users);
    return users;
  }

  static async findAll(): Promise<IUser[]> {
    const { users } = await orm.readDatabase();

    return users;
  }

  static async findById(id: string): Promise<IUser> {
    const { users } = await orm.readDatabase();
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User by specified id ${id} was not found`);
    }

    return user;
  }

  static async getWithRelations(id: string): Promise<IUser> {
    const user = await this.findById(id);
    const accounts = await Account.getUserAccounts(user.id);
    const accountsWithInvoices = accounts.map(async (account) => ({
      ...account,
      invoices: await Invoice.getAccountInvoices(account.id),
    }));

    return { ...user, accounts: await Promise.all(accountsWithInvoices) };
  }
}
