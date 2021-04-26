import faker from 'faker';
import Database from '../database/Database';
import type { IPhoto } from '../types';
import { DatabaseTableNames } from '../types';
import Dates from './Dates';

export default class Photo extends Dates implements IPhoto {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public userId: string,
    public id: string = faker.datatype.uuid(),
    public imgUrl: string = faker.image.imageUrl(),
    public verifiedStatus: boolean = faker.datatype.boolean(),
    public description: string = faker.commerce.productDescription(),
    public fireCount: number = faker.datatype.number({ min: 0, max: 100 })
  ) {
    super();

    if (this.userId === undefined) {
      throw new Error('userId is undefined');
    }
  }

  static async create(userId: string) {
    const photo = new this(userId);

    await Database.writeToDatabase([photo], DatabaseTableNames.PHOTOS);

    return photo;
  }

  static async findAll(): Promise<IPhoto[]> {
    const { photos } = await Database.readDatabase();

    return photos;
  }

  static async createBulk(count: number, usersIds: string[]): Promise<IPhoto[]> {
    const photos = [...Array(count)].map(() => {
      const randomUserId = usersIds[Math.floor(Math.random() * usersIds.length)];

      return new this(randomUserId);
    });

    await Database.writeToDatabase(photos, DatabaseTableNames.PHOTOS);

    return photos;
  }

  static async getUserPhotos(userId: string): Promise<IPhoto[]> {
    const photos = await this.findAll();

    return photos.filter((photo) => photo.userId === userId);
  }
}
