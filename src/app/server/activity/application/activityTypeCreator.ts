import ActivityTypeRepository from '@server/activity/domain/activityTypeRepository';
import ActivityType from '@server/activity/domain/activityType';
import { ActivityTypeDto } from '@server/activity/domain/activityTypeDto';

export default class ActivityTypeCreator {
  constructor(private readonly repository: ActivityTypeRepository) {}

  async exec(dto: ActivityTypeDto): Promise<ActivityType | null> {
    const actionType = ActivityType.createFrom({
      id: dto.id,
      name: dto.name,
      isProductive: dto.isProductive,
      color: dto.color,
      userId: dto.userId,
    });
    return await this.repository.create(actionType);
  }
}
