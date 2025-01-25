'use server';

import ActivityTimerStarter from '@/Contexts/Activity/application/AcitvityTimerStarter';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';

export default async function startActivityTimer(
  activityId: number
): Promise<boolean> {
  const session = await isUserAuth();
  const repository = new ActivityRepositoryPrisma();
  const startTimerActivity = new ActivityTimerStarter(repository);
  return await startTimerActivity.exec({
    accountId: session.user.accountId,
    activityId,
  });
}
