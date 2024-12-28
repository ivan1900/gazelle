'use server';

import { GetActivityType } from '@/Contexts/ActivityType/application/GetActivityType';
import ActivityTypeRepositoryPrisma from '@/Contexts/ActivityType/repository/ActivityTypeRepositoryPrimsa';
import { getServerAuthSession } from '@server/auth/auth';
import { ActivityTypeDto } from '@/Contexts/ActivityType/domain/ActivityTypeDto';
import { linkTo } from '../../shared/linkTo';
import { redirect } from 'next/navigation';

export default async function getActivityType(): Promise<
  ActivityTypeDto[] | []
> {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      redirect(linkTo.LOGIN);
    }
    const repository = new ActivityTypeRepositoryPrisma();
    const getActivityType = new GetActivityType(repository);
    return getActivityType.exec(session.user.accountId);
  } catch (e) {
    return [];
  }
}
