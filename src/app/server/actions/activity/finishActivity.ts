'use server';

import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';
import ActivityFinalizer from '@/Contexts/Activity/application/ActivityFinalizer';

export default async function finishActivity(
  activityId: number
): Promise<boolean> {
  await isUserAuth();
  const activityFinalizaer = new ActivityFinalizer(
    new ActivityRepositoryPrisma()
  );
  return await activityFinalizaer.exec(activityId);
}
