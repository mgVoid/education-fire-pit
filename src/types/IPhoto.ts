import { IHasId } from '.';

export default interface IPhoto extends IHasId {
  userId: string;
  imgUrl: string;
  verifiedStatus: boolean;
  description: string;
  fireCount: number;
}
