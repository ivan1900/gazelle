import ActivityTypeRepository from '@/contexts/activity/domain/activityTypeRepository';
import ActivityType from '@/contexts/activity/domain/activityType';
import { ActivityTypeDto } from '@/contexts/activity/domain/activityTypeDto';

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
