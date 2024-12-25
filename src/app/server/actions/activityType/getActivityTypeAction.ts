'use server';

import { GetActivityType } from '@/Contexts/ActivityType/application/GetActivityType';
import ActivityTypeRepositoryPrisma from '@/Contexts/ActivityType/repository/ActivityTypeRepositoryPrimsa';
import { getServerAuthSession } from '@server/auth/auth';
import { ActivityTypeDto } from '@/Contexts/ActivityType/domain/ActivityTypeDto';

export default async function getActivityType(): Promise<
  ActivityTypeDto[] | []
> {
  const session = await getServerAuthSession();
  if (!session) {
    return [];
  }
  const repository = new ActivityTypeRepositoryPrisma();
  const getActivityType = new GetActivityType(repository);
  return getActivityType.exec(session.user.accountId);
}
