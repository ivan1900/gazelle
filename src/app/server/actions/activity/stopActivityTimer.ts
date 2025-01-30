'use server';

import ActivityTimerStopper from '@/Contexts/Activity/application/ActivityTimerStopper';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';
import { ActionResponse } from '../../shared/responseAction';

export default async function stopActivityTimer(
  activityId: number
): Promise<ActionResponse> {
  await isUserAuth();
  try {
    const activityTimerStopper = new ActivityTimerStopper(
      new ActivityRepositoryPrisma()
    );
    const result = await activityTimerStopper.exec(activityId);
    return {
      ok: result,
      message: result ? 'Timer stopped successfully' : 'Internal Server Error',
    };
  } catch (e) {
    return { ok: false, message: 'Internal Server Error' };
  }
}
