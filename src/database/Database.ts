import fs from 'fs';
import path from 'path';
import IDatabase from './IDatabase';
import { IUser, IPhoto, ITag, DatabaseTableNames, DatabaseTemplate } from '../types';

export default class Database implements IDatabase {
  protected databasePath = path.resolve(`${__dirname}/../../database.json`);
  public async databaseInit() {
    const doesDatabaseExist = fs.existsSync(this.databasePath);
    if (!doesDatabaseExist) {
      const database: DatabaseTemplate = { users: [], photos: [], tags: [] };
      fs.writeFileSync(this.databasePath, JSON.stringify(database));
      console.log('Database was created');
    }
  }
  public readDatabase() {
    if (!fs.existsSync(this.databasePath)) {
      throw new Error('Database does not exists');
    }

    const data = fs.readFileSync(this.databasePath, 'utf8');
    return JSON.parse(data);
  }
  public writeToDatabase(data: IUser[] | IPhoto[] | ITag[], databaseTable: DatabaseTableNames) {
    const dbData = this.readDatabase();
    fs.writeFileSync(
      this.databasePath,
      JSON.stringify({
        ...dbData,
        [databaseTable]: [...dbData[databaseTable], ...data],
      })
    );
  }
}
