import fs from 'fs';
import path from 'path';
import fsExists from 'fs.promises.exists';
import { IUser, IPhoto, ITag, DatabaseTableNames, DatabaseTemplate } from '../types';

export default class Database {
  public static databasePath = path.resolve(`${__dirname}/../../database.json`);

  public static async databaseInit() {
    const doesDatabaseExist = await fsExists(this.databasePath);

    if (!doesDatabaseExist) {
      const database: DatabaseTemplate = { users: [], photos: [], tags: [] };

      await fs.promises.writeFile(this.databasePath, JSON.stringify(database));

      console.log('Database was created');
    }
  }

  public static async readDatabase() {
    if (!fs.existsSync(this.databasePath)) {
      throw new Error('Database does not exists');
    }

    const data = await fs.promises.readFile(this.databasePath, 'utf8');

    return JSON.parse(data);
  }

  public static async writeToDatabase(data: IUser[] | IPhoto[] | ITag[], databaseTable: DatabaseTableNames) {
    const dbData = await this.readDatabase();

    await fs.promises.writeFile(
      this.databasePath,
      JSON.stringify({
        ...dbData,
        [databaseTable]: [...dbData[databaseTable], ...data],
      })
    );
  }
}
