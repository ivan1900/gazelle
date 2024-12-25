import ActivityTypeRepository from '@/Contexts/ActivityType/domain/ActivityTypeRepository';
import ActivityType from '@/Contexts/ActivityType/domain/ActivityType';
import { ActivityTypeDto } from '@/Contexts/ActivityType/domain/ActivityTypeDto';

export default class ActivityTypeCreator {
  constructor(private readonly repository: ActivityTypeRepository) {}

  async exec(dto: ActivityTypeDto): Promise<ActivityType | null> {
    const actionType = ActivityType.createFrom({
      id: dto.id || 0,
      name: dto.name,
      isProductive: dto.isProductive,
      color: dto.color,
      accountId: dto.accountId,
    });
    try {
      return await this.repository.create(actionType);
    } catch (e) {
      throw e;
    }
  }
}
