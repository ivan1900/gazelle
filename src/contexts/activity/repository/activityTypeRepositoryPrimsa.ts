import ActivityTypeRepository from '@/contexts/activity/domain/activityTypeRepository';
import prisma from '../../../app/db';
import ActivityType from '@/contexts/activity/domain/activityType';
import { ActivityTypeDto } from '../domain/activityTypeDto';

export default class ActivityTypeRepositoryPrisma
  implements ActivityTypeRepository
{
  async create(actionType: ActivityType): Promise<ActivityType | null> {
    const result = await prisma.activity_type.create({
      data: {
        name: actionType.name,
        is_productive: actionType.isProductive,
        color: actionType.color,
        user_id: actionType.userId,
      },
    });
    if (!result) {
      return null;
    }
    return ActivityType.createFrom({
      id: result.id,
      name: result.name,
      isProductive: result.is_productive,
      color: result.color,
      userId: result.user_id,
    });
  }

  async findByClient(id: number): Promise<ActivityTypeDto[] | []> {
    const result = await prisma.activity_type.findMany({
      where: {
        user_id: id,
      },
    });
    const activityTypes: ActivityTypeDto[] = result?.map((activityType) => {
      return {
        id: activityType.id,
        name: activityType.name,
        isProductive: activityType.is_productive,
        color: activityType.color,
        userId: activityType.user_id,
      };
    });
    return activityTypes;
  }
}
