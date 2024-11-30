import ActivityTypeRepository from '@server/activity/domain/activityTypeRepository';
import ActivityType from '@server/activity/domain/activityType';
import { ActivityTypeDto } from '@server/activity/domain/activityTypeDto';

export default class ActivityTypeCreator {
  // constructor with injection of repository
  constructor(private readonly repository: ActivityTypeRepository) {}

  async exec(dto: ActivityTypeDto): Promise<ActivityType | null> {
    const actionType = ActivityType.createFrom(dto);
    return await this.repository.create(actionType);
  }
}
