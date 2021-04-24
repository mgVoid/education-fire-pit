/* eslint-disable import/no-cycle */
export type { default as IUser } from './IUser';
export type { default as IPhoto } from './IPhoto';
export type { default as ITag } from './ITag';
export type { default as IHasId } from './IHasId';
export type { default as IHasTimestamp } from './IHasTimestamp'; // interfaces naming starts with I
export { default as UserStatuses } from './UserStatuses'; // enums names are plural
export { default as DatabaseTableNames } from './DatabaseTableNames';
export type { default as DatabaseTemplate } from './DatabaseTemplate'; // types names are singular
