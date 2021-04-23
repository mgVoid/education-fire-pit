import faker from 'faker';
import IDatabase from '../database/IDatabase';
import { IPhoto } from '../types';

export default class Photo implements IPhoto {
  public id: string = faker.datatype.uuid();

  // eslint-disable-next-line no-useless-constructor
  constructor(
    public userId = '',
    public imgUrl: string = faker.image.imageUrl(),
    public verifiedStatus: boolean = faker.datatype.boolean(),
    public description: string = faker.commerce.productDescription(),
    public fireCount: number = faker.datatype.number({ min: 0, max: 100 })
  ) {}

  date = faker.date.future();
  public createdAt: Date = this.date;
  public updatedAt: Date = this.date;
  public deletedAt: Date | null = null;

  static findAll(database: IDatabase): IPhoto[] {
    const wholeDatabase = database.readDatabase();
    const { photos } = wholeDatabase;
    return photos;
  }

  static createBulk(count: number, usersIds: string[]): IPhoto[] {
    return [...Array(count)].map(() => {
      const randomUserId = usersIds[Math.floor(Math.random() * usersIds.length)];
      return new this(randomUserId);
    });
  }

  static getUserPhotos(userId: string, database: IDatabase): IPhoto[] {
    const photos = this.findAll(database);
    return photos.filter((photo) => photo.userId === userId);
  }
}
