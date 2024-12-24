import ActivityTypeRepository from '@/contexts/activity/domain/activityTypeRepository';
import prisma from '../../../app/db';
import ActivityType from '@/contexts/activity/domain/activityType';
import { ActivityTypeDto } from '../domain/activityTypeDto';
import { prismaErrorHandle } from '@/contexts/shared/constants/PrismaErrors';

export default class ActivityTypeRepositoryPrisma
  implements ActivityTypeRepository
{
  async create(actionType: ActivityType): Promise<ActivityType | null> {
    try {
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
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async findByClient(id: number): Promise<ActivityTypeDto[] | []> {
    const result = await prisma.activity_type.findMany({
      where: {
        user_id: id,
        deleted_at: null,
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

  async delete(userId: number, name: string): Promise<ActivityType | null> {
    const result = await prisma.activity_type.delete({
      where: {
        user_id_name: {
          user_id: userId,
          name: name,
        },
      },
    });
    return ActivityType.createFrom({
      id: result.id,
      name: result.name,
      isProductive: result.is_productive,
      color: result.color,
      userId: result.user_id,
    });
  }
}
