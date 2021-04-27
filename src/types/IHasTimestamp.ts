export default interface IHasTimestamp {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
