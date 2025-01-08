'use server';

import ActivitiesOnGoingFinder from '@/Contexts/Activity/application/ActivitiesOnGoingFinder';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import { getServerAuthSession } from '../../auth/auth';
import { redirect } from 'next/navigation';
import { linkTo } from '../../shared/linkTo';
import ActivityInfo from '../../shared/types/ActivityInfo';

export default async function getActivitiesOnGoing(): Promise<ActivityInfo[]> {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.accountId) {
      redirect(linkTo.LOGIN);
    }
    const activitiesNotComletedFinder = new ActivitiesOnGoingFinder(
      new ActivityRepositoryPrisma()
    );
    return await activitiesNotComletedFinder.exec(session.user.accountId);
  } catch (e) {
    return []; // todo responder un status para mostrar errores en el front (todos lo action get)
  }
}
