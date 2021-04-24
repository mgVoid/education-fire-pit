import { IHasId, IHasTimestamp } from '.';

export default interface IPhoto extends IHasId, IHasTimestamp {
  userId: string;
  imgUrl: string;
  verifiedStatus: boolean;
  description: string;
  fireCount: number;
}
