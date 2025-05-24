import { ActivityStatusOption } from '@/Contexts/shared/domain/constants/ActivityStatus';
import { ActivityInfo } from '../domain/ActivityInfo';
import ActivityRepository from '../domain/ActivityRepository';
import ActivitySpec from '../domain/specifications/ActivitySpec';

export default class ActivitiesOnGoingFinder {
  constructor(private repository: ActivityRepository) {}

  async exec(accountId: number): Promise<ActivityInfo[]> {
    try {
      // const result = await this.repository.findAllOnGoing(accountId);
      const result = await this.repository.getActivities(
        ActivitySpec.isSatisfiedByStatusOnProgress(accountId)
      );
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
