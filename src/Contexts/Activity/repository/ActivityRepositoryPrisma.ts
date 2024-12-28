import prisma from '@/app/db';
import ActivityRepository from '../domain/ActivityRepository';
import Activity from '../domain/Activity';
import { prismaErrorHandle } from '@/Contexts/shared/constants/PrismaErrors';
import ActivityStatus from '../domain/ActivityStatus';
import { ActivityStatusOption } from '@/Contexts/shared/constants/ActivityStatus';
import { ActivityDto } from '../domain/AcitvityDto';

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

  async findAllNotCompleted(accountId: number): Promise<ActivityDto[]> {
    try {
      const result = await prisma.activity.findMany({
        where: {
          account_id: accountId,
          NOT: { status: ActivityStatusOption.COMPLETED },
        },
      });
      const activities: ActivityDto[] = result.map((activity) => {
        return {
          id: activity.id,
          name: activity.name,
          description: activity.description || '',
          status: activity.status,
          activityTypeId: activity.activity_type_id,
          accountId: activity.account_id,
          createdAt: activity.created_at,
          updatedAt: activity.updated_at,
        };
      });
      return activities;
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async findCompleted({
    accountId,
    lastDays,
  }: {
    accountId: number;
    lastDays: number;
  }): Promise<ActivityDto[]> {
    try {
      const currentLessLastDays = new Date(
        new Date().setDate(new Date().getDate() - lastDays)
      );
      const result = await prisma.activity.findMany({
        where: {
          account_id: accountId,
          status: ActivityStatusOption.COMPLETED,
          updated_at: {
            gte: currentLessLastDays,
          },
        },
      });
      const activities: ActivityDto[] = result.map((activity) => {
        return {
          id: activity.id,
          name: activity.name,
          description: activity.description || '',
          status: activity.status,
          activityTypeId: activity.activity_type_id,
          accountId: activity.account_id,
          createdAt: activity.created_at,
          updatedAt: activity.updated_at,
        };
      });
      return activities;
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }
}
