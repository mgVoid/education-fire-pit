export interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IHasId {
  id: string;
}
