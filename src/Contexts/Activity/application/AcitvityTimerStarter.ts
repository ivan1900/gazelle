import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityTimerStarter {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(activityId: number): Promise<void> {
    try {
      await this.repository.stopTimer(activityId);
      await this.repository.startTimer(activityId);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
