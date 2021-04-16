import faker from 'faker';

import type { IInvoice } from '../interfaces/Invoice';

import Dates from './Dates';

interface IINvoiceClass {}

export default class Invoice extends Dates implements IInvoice, IINvoiceClass {
  constructor(
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
}
