import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityTimerStopper {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(activityId: number): Promise<boolean> {
    try {
      await this.repository.stopTimer(activityId);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
