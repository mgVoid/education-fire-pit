import faker from 'faker';

import { IUser, CustomerType } from '../interfaces/User';
import type { IAccount } from '../interfaces/Account';

import Dates from './Dates';
interface IUserClass {
  // findById: (id: string) => IUser;
  // getAll: () => IUser[];
}

export default class User extends Dates implements IUser, IUserClass {
  constructor(
    public id: string = faker.datatype.uuid(),
    public name: string = faker.name.findName(),
    public customerType: CustomerType = faker.random.arrayElement(Object.values(CustomerType)),
    public accounts: IAccount[] = []
  ) {
    super();
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

  static createBulk(count: number) {
    // [...Array(count)].forEach(() => new User());
    // console.log(users);
  }

  public getAll() {
    // return users;
  }

  public findById(id: string) {
    // return users.find((user) => user.id === id);
  }
}
