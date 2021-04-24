import Database from './database/Database';
import Builder from './controllers/Builder';
import Analytics from './controllers/Analytics';

Database.databaseInit();

const usersCount = 3;
const tagsCount = 5;
const photosCount = 10;
const builder = new Builder(usersCount, tagsCount, photosCount);

(async () => {
  await builder.appendNewDataToDatabase();
  await Analytics.displayRandomUserData();
})();
