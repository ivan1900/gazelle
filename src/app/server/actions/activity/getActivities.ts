'use server';

import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';
import ActivityInfo from '../../shared/types/ActivityInfo';
import isUserAuth from '../../shared/checkUserAuth';
import ActivitiesFinder from '@/Contexts/Activity/application/AcitivitiesFinder';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';

export default async function getActivities(
  criteriaSerialized: string
): Promise<ActivityInfo[]> {
  const criteria = new Criteria(JSON.parse(criteriaSerialized));
  try {
    const session = await isUserAuth();
    const activitiesFinder = new ActivitiesFinder(
      new ActivityRepositoryPrisma()
    );
    criteria.addFilter({
      field: 'account_id',
      value: session.user.accountId,
      operator: 'eq',
    });
    const result = await activitiesFinder.exec(criteria);
    return result;
  } catch (e) {
    return [];
  }
}
