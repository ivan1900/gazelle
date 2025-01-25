'use server';

import ActivityTimerStarter from '@/Contexts/Activity/application/AcitvityTimerStarter';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';

export default async function startActivityTimer(
  activityId: number
): Promise<boolean> {
  await isUserAuth();
  const startTimerActivity = new ActivityTimerStarter(
    new ActivityRepositoryPrisma()
  );
  return await startTimerActivity.exec(activityId);
}
