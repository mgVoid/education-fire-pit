import faker from 'faker';
import IDatabase from '../database/IDatabase';
import { ITag } from '../types';

export default class Tag implements ITag {
  public id: string = faker.datatype.uuid();

  // eslint-disable-next-line no-useless-constructor
  constructor(public photoId = '', public tag: string = faker.name.title()) {}

  date = faker.date.future();
  public createdAt: Date = this.date;
  public updatedAt: Date = this.date;
  public deletedAt: Date | null = null;

  static createBulk(count: number, photosIds: string[]) {
    return [...Array(count)].map(() => {
      const randomPhotoId = photosIds[Math.floor(Math.random() * photosIds.length)];
      return new this(randomPhotoId);
    });
  }

  static findAll(database: IDatabase): ITag[] {
    const wholeDatabase = database.readDatabase();
    const { tags } = wholeDatabase;
    return tags;
  }

  static getPhotoTags(photoId: string, database: IDatabase): ITag[] {
    const tags: ITag[] = Tag.findAll(database);
    return tags.filter((tag) => tag.photoId === photoId);
  }
}
