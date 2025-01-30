'use server';

import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import ActivityInfo from '../../shared/types/ActivityInfo';
import isUserAuth from '../../shared/checkUserAuth';
import ActivitiesFinishedFinder from '@/Contexts/Activity/application/ActivitiesFinishedFinder';

export default async function getActivitiesFinished(
  lastDays: number
): Promise<ActivityInfo[]> {
  try {
    const session = await isUserAuth();
    const activitiesFinishedFinder = new ActivitiesFinishedFinder(
      new ActivityRepositoryPrisma()
    );
    const result = await activitiesFinishedFinder.exec(
      session.user.accountId,
      lastDays
    );
    return result;
  } catch (e) {
    return [];
  }
}
