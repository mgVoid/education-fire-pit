import { IHasId, IHasTimestamp, UserStatuses } from '.';

export default interface User extends IHasId, IHasTimestamp {
  id: string;
  firstName: string;
  lastName: string;
  pseudoname: string;
  status: UserStatuses;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
