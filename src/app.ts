import Builder from './controllers/Builder';
import { printRandomUserData } from './controllers/Analytics';
import { orm } from './models';

orm.databaseInit();

const usersCount = 3;
const accountsCount = 5;
const invoicesCount = 10;
const builder = new Builder(usersCount, accountsCount, invoicesCount);

(async () => {
  await builder.makeDatabase();
  await printRandomUserData();
})();
