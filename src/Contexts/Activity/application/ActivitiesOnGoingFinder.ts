import { ActivityInfo } from '../domain/ActivityInfo';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActivitiesOnGoingFinder {
  constructor(private repository: ActivityRepository) {}

  async exec(accountId: number): Promise<ActivityInfo[]> {
    try {
      return await this.repository.findAllOnGoing(accountId);
    } catch (e) {
      throw e;
    }
  }
}
