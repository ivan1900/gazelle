'use server';

import ActivitiesNotComletedFinder from '@/Contexts/Activity/application/ActivitiesNotCompletedFinder';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import { getServerAuthSession } from '../../auth/auth';
import { redirect } from 'next/navigation';
import { linkTo } from '../../shared/linkTo';
import { ActivityDto } from '@/Contexts/Activity/domain/AcitvityDto';

export default async function getActivitiesNotCompleted(): Promise<
  ActivityDto[]
> {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.accountId) {
      redirect(linkTo.LOGIN);
    }
    const activitiesNotComletedFinder = new ActivitiesNotComletedFinder(
      new ActivityRepositoryPrisma()
    );
    return await activitiesNotComletedFinder.exec(session.user.accountId);
  } catch (e) {
    return []; // todo responder un status para mostrar errores en el front (todos lo action get)
  }
}
