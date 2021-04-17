import Builder from './controllers/Builder';
import { orm } from './models';

orm.databaseInit();

const usersCount = 3;
const accountsCount = 5;
const invoicesCount = 10;
const builder = new Builder(usersCount, accountsCount, invoicesCount);

builder.makeDatabase();
