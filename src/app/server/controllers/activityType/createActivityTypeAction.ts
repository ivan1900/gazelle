'use server';
import { ActivityTypeDto } from '@server/activity/domain/activityTypeDto';
import ActivityTypeCreator from '@server/activity/application/activityTypeCreator';
import ActivityTypeRepositoryPrisma from '@server/activity/repository/activityTypeRepositoryPrimsa';
import { ResponseActionType } from '@/app/server/shared/responseAction';

export async function createActivityTypeAction(
  dto: ActivityTypeDto
): Promise<ResponseActionType> {
  const activityTypeCreator = new ActivityTypeCreator(
    new ActivityTypeRepositoryPrisma()
  );
  const result = await activityTypeCreator.exec(dto);
  if (result) {
    return {
      ok: true,
      message: 'Activity type created',
    };
  }
  return {
    ok: false,
    message: 'Activity type not created',
  };
}
