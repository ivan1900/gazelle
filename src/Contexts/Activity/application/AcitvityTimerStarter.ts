import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityTimerStarter {
  constructor(private readonly repository: ActivityRepository) {}

  async exec({
    accountId,
    activityId,
  }: {
    accountId: number;
    activityId: number;
  }): Promise<void> {
    try {
      await this.repository.stopTimer(activityId);
      await this.repository.startTimer({ accountId, activityId });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
