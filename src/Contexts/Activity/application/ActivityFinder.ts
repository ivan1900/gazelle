import { ActivityInfo } from '../domain/ActivityInfo';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityFinder {
  constructor(private readonly repository: ActivityRepository) {}

  // async exec(activityId: number): Promise<ActivityInfo> {
  //   try {
  //     return this.repository.find(activityId);
  //   } catch (e) {
  //     console.error(e);
  //     throw e;
  //   }
  // }
}
