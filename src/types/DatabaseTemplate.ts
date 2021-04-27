import type { IUser, IPhoto, ITag } from '.';

type DatabaseTemplate = {
  users: IUser[];
  photos: IPhoto[];
  tags: ITag[];
};

export default DatabaseTemplate;
