import prisma from '@/app/db';
import ActivityRepository from '../domain/ActivityRepository';
import Activity from '../domain/Activity';
import { prismaErrorHandle } from '@/Contexts/shared/constants/PrismaErrors';
import ActivityStatus from '../domain/ActivityStatus';
import { ActivityStatusOption } from '@/Contexts/shared/constants/ActivityStatus';
import { ActivityDto } from '../domain/AcitvityDto';
import { ActivityInfo } from '../domain/ActivityInfo';

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
        id: result.id,
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

  async findAllOnGoing(accountId: number): Promise<ActivityInfo[]> {
    try {
      const result = await prisma.activity.findMany({
        where: {
          account_id: accountId,
          NOT: { status: ActivityStatusOption.COMPLETED },
        },
        include: {
          activity_type: true,
        },
      });
      const activities: ActivityInfo[] = result.map((activity) => {
        const activityInfo: ActivityInfo = {
          id: activity.id,
          name: activity.name,
          description: activity.description || '',
          status: activity.status,
          type: {
            name: activity.activity_type?.name || '',
            isProductive: activity.activity_type?.is_productive || false,
            color: activity.activity_type?.color || '',
          },
          createdAt: activity.created_at,
          updatedAt: activity.updated_at,
        };
        return activityInfo;
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

  async startTimer(activityId: number): Promise<void> {
    try {
      await prisma.activity.update({
        where: {
          id: activityId,
        },
        data: {
          status: ActivityStatusOption.ON_PROGRESS,
        },
      });
      await prisma.action_time.create({
        data: {
          activity_id: activityId,
          start: new Date(),
        },
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async stopTimer(activityId: number): Promise<void> {
    try {
      await prisma.activity.update({
        where: {
          id: activityId,
        },
        data: {
          status: ActivityStatusOption.WAITING,
        },
      });
      const lastTimer = await prisma.action_time.findFirst({
        where: {
          activity_id: activityId,
          end: null,
        },
        orderBy: {
          id: 'desc',
        },
      });
      await prisma.action_time.updateMany({
        where: {
          id: lastTimer?.id,
        },
        data: {
          end: new Date(),
        },
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }
}
