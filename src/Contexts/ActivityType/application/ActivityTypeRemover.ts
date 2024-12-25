import ActivityType from '../domain/ActivityType';
import ActivityTypeRepository from '../domain/ActivityTypeRepository';

export default class ActivityTypeRemover {
  constructor(private readonly repository: ActivityTypeRepository) {}

  async exec(accountId: number, name: string): Promise<ActivityType | null> {
    return await this.repository.delete(accountId, name);
  }
}
