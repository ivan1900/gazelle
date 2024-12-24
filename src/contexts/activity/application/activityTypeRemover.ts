import ActivityType from '../domain/activityType';
import ActivityTypeRepository from '../domain/activityTypeRepository';

export default class ActivityTypeRemover {
  constructor(private readonly repository: ActivityTypeRepository) {}

  async exec(userId: number, name: string): Promise<ActivityType | null> {
    return await this.repository.delete(userId, name);
  }
}
