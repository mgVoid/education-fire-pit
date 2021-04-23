import IBuilder from './IBuilder';
import IDatabase from '../database/IDatabase';
import { DatabaseTableNames, IUser, IPhoto } from '../types';
import { User, Photo, Tag } from '../models';

export default class Builder implements IBuilder {
  /* eslint-disable no-useless-constructor */
  constructor(
    private database: IDatabase,
    private usersCount: number = 1,
    private photosCount: number = 10,
    private tagsCount: number = 10
  ) {}

  public appendDataToDatabase(): void {
    // Generating and writing users to database.json
    const users = User.createBulk(this.usersCount);
    this.database.writeToDatabase(users, DatabaseTableNames.USERS);

    // Generating and writing photos to database.json
    const usersIds = users.map((user: IUser) => user.id);
    const photos = Photo.createBulk(this.photosCount, usersIds);
    this.database.writeToDatabase(photos, DatabaseTableNames.PHOTOS);

    // Generating and writing tags to database.json
    const photosIds = photos.map((photo: IPhoto) => photo.id);
    const tags = Tag.createBulk(this.tagsCount, photosIds);
    this.database.writeToDatabase(tags, DatabaseTableNames.TAGS);
  }
}
