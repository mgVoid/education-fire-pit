import faker from 'faker';

import type { IInvoice } from '../interfaces/Invoice';
import { Databases } from '../interfaces/General';

import Dates from './Dates';
import { orm } from './';

interface IINvoiceClass {}

export default class Invoice extends Dates implements IInvoice, IINvoiceClass {
  constructor(
    public accountId: string = null,
    public id: string = faker.datatype.uuid(),
    public amount: number = faker.datatype.float(),
    public isConfirmed: boolean = faker.datatype.boolean(),
    public productDescription: string = faker.lorem.sentences(2)
  ) {
    super();
  }

  static create() {
    const invoice = new this();
    // idedam i duomenu baze nauja irasa

    return invoice;
  }

  static async createBulk(count: number, accountsIds: string[]) {
    const invoices: IInvoice[] = [...Array(count)].map((_) => {
      const randomAccountID = accountsIds[Math.floor(Math.random() * accountsIds.length)];

      return new this(randomAccountID);
    });

    await orm.writeToDatabase(Databases.INVOICES, invoices);
    return invoices;
  }

  static async getAccountInvoices(accountId: string): Promise<IInvoice[]> {
    const { invoices } = await orm.readDatabase();
    return invoices.filter((invoice) => invoice.accountId === accountId);
  }
}
