import faker from 'faker';
import IDatabase from '../database/IDatabase';
import { IUser, UserStatuses } from '../types';
import { Photo, Tag } from '.';

export default class User implements IUser {
  public id: string = faker.datatype.uuid();

  // eslint-disable-next-line no-useless-constructor
  constructor(
    public firstName: string = faker.datatype.uuid(),
    public lastName: string = faker.datatype.uuid(),
    public pseudoname: string = faker.datatype.uuid(),
    public status: UserStatuses = faker.random.arrayElement([
      UserStatuses.ACTIVE,
      UserStatuses.DISABLED,
      UserStatuses.BANNED,
    ])
  ) {}

  date = faker.date.future();
  public createdAt: Date = this.date;
  public updatedAt: Date = this.date;
  public deletedAt: Date | null = null;

  static createBulk(count: number): IUser[] {
    return [...Array(count)].map((_, key) => {
      return new this();
    });
  }

  static findAll(database: IDatabase): IUser[] {
    const wholeDatabase = database.readDatabase();
    const { users } = wholeDatabase;
    return users;
  }

  static findById(id: string, database: IDatabase): IUser {
    const users = this.findAll(database);
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User by specified id ${id} was not found`);
    }
    return user;
  }

  static getUserWithRelations(id: string, database: IDatabase) {
    const user: IUser = this.findById(id, database);
    const photos = Photo.getUserPhotos(user.id, database);
    const photosWithTags = photos.map((photo) => {
      return {
        ...photo,
        tags: Tag.getPhotoTags(photo.id, database),
      };
    });
    return { ...user, photos: photosWithTags };
  }
}
