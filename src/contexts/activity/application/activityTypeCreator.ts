import ActivityTypeRepository from '@/contexts/activity/domain/activityTypeRepository';
import ActivityType from '@/contexts/activity/domain/activityType';
import { ActivityTypeDto } from '@/contexts/activity/domain/activityTypeDto';

export default class ActivityTypeCreator {
  constructor(private readonly repository: ActivityTypeRepository) {}

  async exec(dto: ActivityTypeDto): Promise<ActivityType | null> {
    const actionType = ActivityType.createFrom({
      id: dto.id || 0,
      name: dto.name,
      isProductive: dto.isProductive,
      color: dto.color,
      userId: dto.userId,
    });
    try {
      return await this.repository.create(actionType);
    } catch (e) {
      throw e;
    }
  }
}
