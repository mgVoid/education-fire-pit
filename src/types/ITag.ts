import { IHasId, IHasTimestamp } from '.';

export default interface Tag extends IHasId, IHasTimestamp {
  photoId: string;
  tag: string;
}
