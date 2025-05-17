'use server';

import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';
import { ActionTime } from '../../shared/types/ActivityInfo';
import isUserAuth from '../../shared/checkUserAuth';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';

// todo: revisar que hacer con este action, no se esta usando
export default async function getActions(
  criteriaSerialized: string
): Promise<ActionTime[]> {
  const criteria = new Criteria(JSON.parse(criteriaSerialized));
  try {
    const session = await isUserAuth();
    criteria.addFilter({
      field: 'account_id',
      value: session.user.accountId,
      operator: 'eq',
    });
    const repository = new ActivityRepositoryPrisma();
    const result = await repository.getActions(criteria);
    return result;
  } catch (e) {
    return [];
  }
}
