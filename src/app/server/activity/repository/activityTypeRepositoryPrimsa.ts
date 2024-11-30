import ActivityTypeRepository from '@server/activity/domain/activityTypeRepository';
import prisma from '../../../db';
import ActivityType from '@server/activity/domain/activityType';
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
        client_id: actionType.clientId,
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
      clientId: result.client_id,
    });
  }

  async findByClient(id: number): Promise<ActivityTypeDto[] | []> {
    const result = await prisma.activity_type.findMany({
      where: {
        client_id: id,
      },
    });
    const activityTypes: ActivityTypeDto[] = result?.map((activityType) => {
      return {
        id: activityType.id,
        name: activityType.name,
        isProductive: activityType.is_productive,
        color: activityType.color,
      };
    });
    return activityTypes;
  }
}
