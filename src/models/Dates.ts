import type { IHasTimestamp } from '../types';

export default class Dates implements IHasTimestamp {
  constructor(
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null
  ) {}
}
