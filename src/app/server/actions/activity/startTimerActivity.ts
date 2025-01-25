'use server';

import StartActivityTimer from '@/Contexts/Activity/application/StartActivityTimer';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';

export default async function startActivityTimerAction(
  activityId: number
): Promise<boolean> {
  await isUserAuth();
  const repository = new ActivityRepositoryPrisma();
  const startTimerActivity = new StartActivityTimer(repository);
  return await startTimerActivity.exec(activityId);
}
