import { IHasId } from '.';

export default interface Tag extends IHasId {
  photoId: string;
  tag: string;
}
