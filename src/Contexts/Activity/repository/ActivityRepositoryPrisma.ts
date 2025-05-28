import prisma from '@/app/db';
import ActivityRepository from '../domain/ActivityRepository';
import Activity from '../domain/Activity';
import { prismaErrorHandle } from '@/Contexts/shared/domain/constants/PrismaErrors';
import { ActivityStatusOption } from '@/Contexts/shared/domain/constants/ActivityStatus';
import { ActivityInfo, ActionTime } from '../domain/ActivityInfo';
import CriteriaToPrisma from '@/Contexts/shared/domain/Criteria/CriteriaToPrisma';
import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';
import { ActionUpdateDto } from '../domain/ActionUpdateDto';

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

  async update(activity: Activity): Promise<void> {
    try {
      await prisma.activity.update({
        where: {
          id: activity.id!,
        },
        data: {
          name: activity.name.value,
          description: activity.description.value,
          activity_type_id: activity.activityTypeId.value,
          updated_at: new Date(),
        },
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async startTimer({
    accountId,
    activityId,
  }: {
    accountId: number;
    activityId: number;
  }): Promise<void> {
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
          account_id: accountId,
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
      await prisma.action_time.updateMany({
        where: {
          activity_id: activityId,
          end: null,
        },
        data: {
          end: new Date(),
        },
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async setActivityAsCompleted(activityId: number): Promise<void> {
    try {
      await prisma.activity.update({
        where: {
          id: activityId,
        },
        data: {
          status: ActivityStatusOption.COMPLETED,
        },
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async remove(activityId: number): Promise<void> {
    try {
      await prisma.action_time.deleteMany({
        where: {
          activity_id: activityId,
        },
      });
      await prisma.activity.delete({
        where: {
          id: activityId,
        },
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async getActivities(criteria: Criteria): Promise<ActivityInfo[]> {
    const { where, orderBy, skip, take } = CriteriaToPrisma.convert(criteria);
    const result = await prisma.activity.findMany({
      where: where,
      orderBy: orderBy,
      skip: skip,
      take: take,
      include: {
        activity_type: true,
        action_time: {
          orderBy: {
            id: 'desc',
          },
        },
      },
    });
    const activities: ActivityInfo[] = result.map((activity) => {
      return this.activityInfoMapper(activity);
    });

    return activities;
  }

  async getActions(criteria: Criteria): Promise<ActionTime[]> {
    const { where, orderBy, skip, take } = CriteriaToPrisma.convert(criteria);
    const result = await prisma.action_time.findMany({
      where: where,
      orderBy: orderBy,
      skip: skip,
      take: take,
    });

    const actions: ActionTime[] = result.map((action) => {
      return {
        id: action.id,
        activityId: action.activity_id,
        start: action.start,
        end: action.end,
      };
    });

    return actions;
  }

  async getAction({
    actionId,
    accountId,
  }: {
    actionId: number;
    accountId: number;
  }): Promise<ActionTime | null> {
    const action = await prisma.action_time.findFirst({
      where: {
        id: actionId,
        account_id: accountId,
      },
    });

    if (!action) {
      return null;
    }

    const actionTime: ActionTime = {
      id: action.id,
      activityId: action.activity_id,
      start: action.start,
      end: action.end,
    };
    return actionTime;
  }

  async updateActionTime(dto: ActionUpdateDto): Promise<void> {
    await prisma.action_time.update({
      where: {
        id: dto.id,
      },
      data: {
        start: dto.start,
        end: dto.end,
      },
    });
  }

  private activityInfoMapper(
    activity: {
      action_time: {
        id: number;
        activity_id: number;
        start: Date | null;
        end: Date | null;
      }[];
      activity_type: {
        id: number;
        name: string;
        account_id: number;
        is_productive: boolean;
        color: string | null;
        deleted_at: Date | null;
      } | null;
    } & {
      id: number;
      name: string;
      description: string | null;
      status: string;
      account_id: number;
      activity_type_id: number;
      created_at: Date | null;
      updated_at: Date | null;
    }
  ): ActivityInfo {
    return {
      id: activity.id,
      name: activity.name,
      description: activity.description || '',
      status: activity.status,
      type: {
        id: activity.activity_type?.id || 0,
        name: activity.activity_type?.name || '',
        isProductive: activity.activity_type?.is_productive || false,
        color: activity.activity_type?.color || '',
      },
      actions: activity.action_time.map((action) => {
        return {
          id: action.id,
          activityId: action.activity_id,
          start: action.start,
          end: action.end,
        };
      }),
      createdAt: activity.created_at,
      updatedAt: activity.updated_at,
    };
  }
}
