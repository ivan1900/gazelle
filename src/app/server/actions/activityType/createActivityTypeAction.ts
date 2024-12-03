'use server';
import { ActivityTypeDto } from '@/contexts/activity/domain/activityTypeDto';
import ActivityTypeCreator from '@/contexts/activity/application/activityTypeCreator';
import ActivityTypeRepositoryPrisma from '@/contexts/activity/repository/activityTypeRepositoryPrimsa';
import { ResponseActionType } from '@/contexts/shared/responseAction';

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
