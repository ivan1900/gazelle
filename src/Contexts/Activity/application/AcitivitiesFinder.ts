import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';
import ActivityRepository from '../domain/ActivityRepository';
import { ActivityInfo } from '../domain/ActivityInfo';

export default class ActivitiesFinder {
  constructor(private readonly repository: ActivityRepository) {}

  exec(criteria: Criteria): Promise<ActivityInfo[]> {
    return this.repository.getActivities(criteria);
  }
}
