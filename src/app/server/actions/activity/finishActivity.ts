'use server';

import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';
import ActivityFinalizer from '@/Contexts/Activity/application/ActivityFinalizer';
import { ActionResponse } from '../../shared/responseAction';

export default async function finishActivity(
  activityId: number
): Promise<ActionResponse> {
  await isUserAuth();
  try {
    const activityFinalizer = new ActivityFinalizer(
      new ActivityRepositoryPrisma()
    );
    const result = await activityFinalizer.exec(activityId);
    return {
      ok: result,
      message: result ? 'Actividad finalizada' : 'Internal Server Error',
    };
  } catch (e) {
    return { ok: false, message: 'Internal Server Error' };
  }
}
