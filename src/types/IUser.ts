import { IHasId, UserStatuses } from '.';

export default interface User extends IHasId {
  firstName: string;
  lastName: string;
  pseudoname: string;
  status: UserStatuses;
}
