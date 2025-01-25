import ActivityRepository from '../domain/ActivityRepository';

export default class StartActivityTimer {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(activityId: number): Promise<boolean> {
    try {
      await this.repository.startTimer(activityId);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
