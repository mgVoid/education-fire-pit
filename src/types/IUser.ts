import { IHasId, IHasTimestamp, UserStatuses } from '.';

export default interface User extends IHasId, IHasTimestamp {
  firstName: string;
  lastName: string;
  pseudoname: string;
  status: UserStatuses;
}
