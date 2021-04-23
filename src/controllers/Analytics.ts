import fs from 'fs';
import IDatabase from '../database/IDatabase';
import { User } from '../models';

export default class Analytics {
  // eslint-disable-next-line no-useless-constructor
  constructor(private database: IDatabase) {}

  displayRandomUserData(): void {
    const users = User.findAll(this.database);
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const fullUserData = User.getUserWithRelations(randomUser.id, this.database);
    fs.writeFile('output.json', JSON.stringify(fullUserData), (err) => {
      if (err) return console.log(err);
      console.log('output.json File written!');
    });
    console.dir(fullUserData, { depth: null });
  }
}
