import faker from 'faker';
import Database from '../database/Database';
import type { IUser } from '../types';
import { DatabaseTableNames, UserStatuses } from '../types';
import { Photo, Tag } from '.';
import Dates from './Dates';

export default class User extends Dates implements IUser {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: string = faker.datatype.uuid(),
    public firstName: string = faker.datatype.uuid(),
    public lastName: string = faker.datatype.uuid(),
    public pseudoname: string = faker.datatype.uuid(),
    public status: UserStatuses = faker.random.arrayElement(Object.values(UserStatuses))
  ) {
    super();
  }

  static async create() {
    const user = new this();

    await Database.writeToDatabase([user], DatabaseTableNames.USERS);

    return user;
  }

  static async createBulk(count: number): Promise<IUser[]> {
    const users = [...Array(count)].map(() => {
      return new this();
    });

    await Database.writeToDatabase(users, DatabaseTableNames.USERS);

    return users;
  }

  static async findAll(): Promise<IUser[]> {
    const { users } = await Database.readDatabase();

    return users;
  }

  static async findById(id: string): Promise<IUser> {
    const users = await this.findAll();

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User by specified id ${id} was not found`);
    }

    return user;
  }

  static async getUserWithRelations(id: string) {
    const user: IUser = await this.findById(id);

    const photos = await Photo.getUserPhotos(user.id);

    const photosWithTags = photos.map(async (photo) => {
      return {
        ...photo,
        tags: await Tag.getPhotoTags(photo.id),
      };
    });

    return { ...user, photos: await Promise.all(photosWithTags) };
  }
}
