import fs from 'fs';
import path from 'path';

import type { Databases } from '../interfaces/General';
import type { IUser } from '../interfaces/User';
import type { IAccount } from '../interfaces/Account';
import type { IInvoice } from '../interfaces/Invoice';

import User from './User';
import Invoice from './Invoice';
import Account from './Account';

const databasePath = path.resolve(`${__dirname}/../../database.json`);

const databaseInit = () => {
  if (!fs.existsSync(databasePath)) {
    const database = { users: [], accounts: [], invoices: [] };
    fs.writeFileSync(databasePath, JSON.stringify(database));
    console.log('Database was created');
  }
};

const readDatabase = () => {
  if (!fs.existsSync(databasePath)) {
    throw new Error('Database does not exists');
  }

  const data = fs.readFileSync(databasePath, 'utf8');
  return JSON.parse(data);
};

const writeToDatabase = async (database: Databases, data: IUser[] | IAccount[] | IInvoice[]) => {
  const dbData = readDatabase();

  return fs.writeFileSync(
    databasePath,
    JSON.stringify({
      ...dbData,
      [database]: [...dbData[database], ...data],
    })
  );
};

const doesRecordsExists = (): boolean => {
  let database;

  try {
    database = readDatabase();
  } catch (e) {
    return false;
  }

  if (!database.users.length) {
    return false;
  }

  return true;
};

const orm = {
  databaseInit,
  databasePath,
  writeToDatabase,
  readDatabase,
  doesRecordsExists,
};

export { User, Invoice, Account, orm };
