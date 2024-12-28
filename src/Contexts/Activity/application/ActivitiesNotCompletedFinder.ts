import { ActivityDto } from '../domain/AcitvityDto';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActivitiesNotComletedFinder {
  constructor(private repository: ActivityRepository) {}

  async exec(accountId: number): Promise<ActivityDto[]> {
    try {
      return await this.repository.findAllNotCompleted(accountId);
    } catch (e) {
      throw e;
    }
  }
}
