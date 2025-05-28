'use server';

import ActivityUpdater from '@/Contexts/Activity/application/ActivityUpdater';
import { ActivityDto } from '@/Contexts/Activity/domain/AcitvityDto';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import { ActionResponse } from '@/app/server/shared/responseAction';
import isUserAuth from '../../shared/checkUserAuth';

export default async function updateActivity(
  dto: ActivityDto
): Promise<ActionResponse> {
  try {
    const session = await isUserAuth();
    const updater = new ActivityUpdater(new ActivityRepositoryPrisma());
    dto.accountId = session.user.accountId;
    await updater.exec(dto);
    return {
      ok: true,
      message: 'Actividad actualizada correctamente',
    };
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: 'Internal Server Error' };
  }
}
