import { IHasId, IHasTimestamp } from '.';

export default interface IPhoto extends IHasId, IHasTimestamp {
  id: string;
  userId: string;
  imgUrl: string;
  verifiedStatus: boolean;
  description: string;
  fireCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
