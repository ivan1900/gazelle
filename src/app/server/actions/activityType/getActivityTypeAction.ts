'use server';

import { GetActivityType } from '@/contexts/activity/application/getActivityType';
import ActivityTypeRepositoryPrisma from '@/contexts/activity/repository/activityTypeRepositoryPrimsa';
import { getServerAuthSession } from '@server/auth/auth';
import { ActivityTypeDto } from '@/contexts/activity/domain/activityTypeDto';

export default async function getActivityType(): Promise<
  ActivityTypeDto[] | []
> {
  const session = await getServerAuthSession();
  if (!session) {
    return [];
  }
  const repository = new ActivityTypeRepositoryPrisma();
  const getActivityType = new GetActivityType(repository);
  return getActivityType.exec(session.user.userId);
}
