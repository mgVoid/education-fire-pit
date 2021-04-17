export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IHasId {
  id: string;
}

export enum Databases {
  USERS = 'users',
  ACCOUNTS = 'accounts',
  INVOICES = 'invoices',
}
