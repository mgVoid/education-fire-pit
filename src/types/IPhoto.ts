import type { IUser, IHasId, IHasTimestamp } from '.';

export default interface IPhoto extends IHasId, IHasTimestamp {
  userId: IUser['id'];
  imgUrl: string;
  verifiedStatus: boolean;
  description: string;
  fireCount: number;
}
