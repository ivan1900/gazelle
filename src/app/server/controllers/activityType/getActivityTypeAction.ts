'use server';

import { GetActivityType } from '../../activity/application/getActivityType';
import ActivityTypeRepositoryPrisma from '../../activity/repository/activityTypeRepositoryPrimsa';

export default async function getActivityType(clientId: number) {
  const repository = new ActivityTypeRepositoryPrisma();
  const getActivityType = new GetActivityType(repository);
  return getActivityType.exec(clientId);
}
