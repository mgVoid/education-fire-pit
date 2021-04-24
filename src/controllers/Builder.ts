import IBuilder from './IBuilder';
import { IUser, IPhoto } from '../types';
import { User, Photo, Tag } from '../models';

export default class Builder implements IBuilder {
  /* eslint-disable no-useless-constructor */
  constructor(private usersCount: number = 5, private photosCount: number = 5, private tagsCount: number = 5) {}

  public async appendNewDataToDatabase() {
    // Generating and writing users to database.json
    const users = await User.createBulk(this.usersCount);

    // Generating and writing photos to database.json
    const usersIds = users.map((user: IUser) => user.id);
    const photos = await Photo.createBulk(this.photosCount, usersIds);

    // Generating and writing tags to database.json
    const photosIds = photos.map((photo: IPhoto) => photo.id);
    await Tag.createBulk(this.tagsCount, photosIds);
  }
}
