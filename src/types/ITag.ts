import type { IPhoto, IHasId, IHasTimestamp } from '.';

export default interface Tag extends IHasId, IHasTimestamp {
  photoId: IPhoto['id'];
  tag: string;
}
