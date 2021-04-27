import faker from 'faker';
import Database from '../database/Database';
import type { ITag } from '../types';
import { DatabaseTableNames } from '../types';
import Dates from './Dates';

export default class Tag extends Dates implements ITag {
  constructor(
    public photoId: string,
    public id: string = faker.datatype.uuid(),
    public tag: string = faker.name.title()
  ) {
    super();
    if (this.photoId === undefined) {
      throw new Error('photoId is undefined');
    }
  }

  static async create(photoId: string) {
    const tag = new this(photoId);

    await Database.writeToDatabase([tag], DatabaseTableNames.TAGS);

    return tag;
  }

  static async createBulk(count: number, photosIds: string[]): Promise<ITag[]> {
    const tags = [...Array(count)].map(() => {
      const randomPhotoId = photosIds[Math.floor(Math.random() * photosIds.length)];

      return new this(randomPhotoId);
    });

    await Database.writeToDatabase(tags, DatabaseTableNames.TAGS);

    return tags;
  }

  static async findAll(): Promise<ITag[]> {
    const { tags } = await Database.readDatabase();

    return tags;
  }

  static async getPhotoTags(photoId: string): Promise<ITag[]> {
    const tags: ITag[] = await Tag.findAll();

    return tags.filter((tag) => tag.photoId === photoId);
  }
}
