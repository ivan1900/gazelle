'use server';

import ActivityRemover from '@/Contexts/Activity/application/ActivityRemover';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';
import { ActionResponse } from '../../shared/responseAction';

export default async function removeActivity(
  activityId: number
): Promise<ActionResponse> {
  await isUserAuth();
  try {
    const activityRemover = new ActivityRemover(new ActivityRepositoryPrisma());
    const response = await activityRemover.exec(activityId);
    return {
      ok: response,
      message: response ? 'Actividad eliminada' : 'Internal Server Error',
    };
  } catch (e) {
    return { ok: false, message: 'Internal Server Error' };
  }
}
