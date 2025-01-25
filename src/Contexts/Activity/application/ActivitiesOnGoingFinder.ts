import { ActivityInfo } from '../domain/ActivityInfo';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActivitiesOnGoingFinder {
  constructor(private repository: ActivityRepository) {}

  async exec(accountId: number): Promise<ActivityInfo[]> {
    try {
      const result = await this.repository.findAllOnGoing(accountId);
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
