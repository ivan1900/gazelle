import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityTimerStarter {
  constructor(private readonly repository: ActivityRepository) {}

  async exec({
    activityId,
    accountId,
  }: {
    activityId: number;
    accountId: number;
  }): Promise<boolean> {
    try {
      await this.repository.stopTimer(accountId);
      await this.repository.startTimer(activityId);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
