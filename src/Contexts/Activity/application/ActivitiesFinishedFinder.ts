import { ActivityInfo } from '../domain/ActivityInfo';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActivitiesFinishedFinder {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(accountId: number, lastDays: number): Promise<ActivityInfo[]> {
    try {
      return this.repository.findCompleted({ accountId, lastDays });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
