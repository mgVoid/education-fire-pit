import { IHasId, IHasTimestamp } from '.';

export default interface Tag extends IHasId, IHasTimestamp {
  id: string;
  photoId: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
