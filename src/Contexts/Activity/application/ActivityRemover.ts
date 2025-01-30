import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityRemover {
  constructor(private repository: ActivityRepository) {}

  async exec(activityId: number): Promise<boolean> {
    try {
      await this.repository.remove(activityId);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
