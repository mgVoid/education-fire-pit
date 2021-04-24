import IDatabase from '../database/IDatabase';
import { User } from '../models';

export default class Analytics {
  // eslint-disable-next-line no-useless-constructor
  constructor(private database: IDatabase) {}

  displayRandomUserData(): void {
    const users = User.findAll(this.database);
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const fullUserData = User.getUserWithRelations(randomUser.id, this.database);

    console.dir(fullUserData, { depth: null });
  }
}
