import { ActivityInfo } from '../domain/ActivityInfo';
import ActivityRepository from '../domain/ActivityRepository';
import ActivitySpec from '../domain/specifications/ActivitySpec';

export default class ActivitiesFinishedFinder {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(accountId: number, lastDays: number): Promise<ActivityInfo[]> {
    try {
      return this.repository.getActivities(
        ActivitySpec.isSatisfiedByStatusCompleted(accountId, lastDays)
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
