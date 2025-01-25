'use server';

import ActivityTimerStopper from '@/Contexts/Activity/application/ActivityTimerStopper';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';

export default async function stopActivityTimer(
  activityId: number
): Promise<boolean> {
  await isUserAuth();
  const repository = new ActivityRepositoryPrisma();
  const activityTimerStopper = new ActivityTimerStopper(repository);
  return await activityTimerStopper.exec(activityId);
}
