import Database from './database/Database';
import IDatabase from './database/IDatabase';
import Builder from './controllers/Builder';
import IBuilder from './controllers/IBuilder';
import Analytics from './controllers/Analytics';

const database: IDatabase = new Database(); // creating database instance
database.databaseInit();

const builder: IBuilder = new Builder(database);
builder.appendDataToDatabase();

const analytics = new Analytics(database);
analytics.displayRandomUserData();
