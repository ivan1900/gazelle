import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityFinalizer {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(activityId: number): Promise<boolean> {
    try {
      await this.repository.stopTimer(activityId);
      await this.repository.setActivityAsCompleted(activityId);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
