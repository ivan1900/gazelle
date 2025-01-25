'use server';

import ActivityTimerStarter from '@/Contexts/Activity/application/AcitvityTimerStarter';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';
import { ActionResponse } from '../../shared/responseAction';

export default async function startActivityTimer(
  activityId: number
): Promise<ActionResponse> {
  await isUserAuth();
  try {
    const startTimerActivity = new ActivityTimerStarter(
      new ActivityRepositoryPrisma()
    );
    await startTimerActivity.exec(activityId);
    return { ok: true, message: 'Timer started successfully' };
  } catch (e) {
    console.error(e);
    return { ok: false, message: 'Error starting timer' };
  }
}
