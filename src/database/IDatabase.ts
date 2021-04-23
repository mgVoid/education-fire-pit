import { IUser, IPhoto, ITag, DatabaseTableNames, DatabaseTemplate } from '../types';

export default interface IDatabase {
  databaseInit(): void;
  readDatabase(): DatabaseTemplate;
  writeToDatabase(data: IUser[] | IPhoto[] | ITag[], databaseTable: DatabaseTableNames): void;
}
