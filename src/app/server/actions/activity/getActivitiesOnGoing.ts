'use server';

import ActivitiesOnGoingFinder from '@/Contexts/Activity/application/ActivitiesOnGoingFinder';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import ActivityInfo from '../../shared/types/ActivityInfo';
import isUserAuth from '../../shared/checkUserAuth';

export default async function getActivitiesOnGoing(): Promise<ActivityInfo[]> {
  try {
    const session = await isUserAuth();
    const activitiesOnGoingFinder = new ActivitiesOnGoingFinder(
      new ActivityRepositoryPrisma()
    );
    const result = await activitiesOnGoingFinder.exec(session.user.accountId);
    return result;
  } catch (e) {
    return [];
  }
}
