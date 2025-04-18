import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';
import ActivityRepository from '../domain/ActivityRepository';
import { ActivityInfo } from '../domain/ActivityInfo';

export default class ActivitiesFinder {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(criteria: Criteria): Promise<ActivityInfo[]> {
    return await this.repository.getActivities(criteria);
  }
}
