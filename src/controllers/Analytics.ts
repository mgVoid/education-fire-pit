import { User } from '../models';

export default class Analytics {
  // eslint-disable-next-line no-useless-constructor

  static async displayRandomUserData(): Promise<void> {
    const users = await User.findAll();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const fullUserData = await User.getUserWithRelations(randomUser.id);

    console.dir(fullUserData, { depth: null });
  }
}
