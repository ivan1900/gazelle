import ActivityTypeRepository from '@/Contexts/ActivityType/domain/ActivityTypeRepository';
import prisma from '../../../app/db';
import ActivityType from '@/Contexts/ActivityType/domain/ActivityType';
import { ActivityTypeDto } from '../domain/ActivityTypeDto';
import { prismaErrorHandle } from '@/Contexts/shared/domain/constants/PrismaErrors';

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
          account_id: actionType.accountId,
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
        accountId: result.account_id,
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async findByAccount(id: number): Promise<ActivityTypeDto[] | []> {
    const result = await prisma.activity_type.findMany({
      where: {
        account_id: id,
        deleted_at: null,
      },
    });
    const activityTypes: ActivityTypeDto[] = result?.map((activityType) => {
      return {
        id: activityType.id,
        name: activityType.name,
        isProductive: activityType.is_productive,
        color: activityType.color,
        accountId: activityType.account_id,
      };
    });
    return activityTypes;
  }

  async delete(accountId: number, name: string): Promise<ActivityType | null> {
    const result = await prisma.activity_type.delete({
      where: {
        account_id_name: {
          account_id: accountId,
          name,
        },
      },
    });
    return ActivityType.createFrom({
      id: result.id,
      name: result.name,
      isProductive: result.is_productive,
      color: result.color,
      accountId: result.account_id,
    });
  }
}
