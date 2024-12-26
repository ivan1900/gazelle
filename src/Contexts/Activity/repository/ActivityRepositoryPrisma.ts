import prisma from '@/app/db';
import ActivityRepository from '../domain/ActivityRepository';
import Activity from '../domain/Activity';
import { prismaErrorHandle } from '@/Contexts/shared/constants/PrismaErrors';

export default class ActivityRepositoryPrisma implements ActivityRepository {
  async create(activity: Activity): Promise<Activity | null> {
    try {
      const result = await prisma.activity.create({
        data: {
          name: activity.name.value,
          description: activity.description.value,
          activity_type_id: activity.activityTypeId.value,
          status: activity.status.value,
          account_id: activity.accountId.value,
        },
      });
      if (!result) {
        return null;
      }
      return Activity.fromPrimitives({
        name: result.name,
        description: result.description || '',
        status: result.status,
        activityTypeId: result.activity_type_id,
        accountId: result.account_id,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }
}
