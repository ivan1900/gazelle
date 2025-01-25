'use server';

import ActivityCreator from '@/Contexts/Activity/application/ActivityCreator';
import { ActivityDto } from '@/Contexts/Activity/domain/AcitvityDto';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import { ActionResponse } from '@/app/server/shared/responseAction';
import isUserAuth from '../../shared/checkUserAuth';

export default async function createActivity(
  dto: ActivityDto
): Promise<ActionResponse> {
  try {
    const session = await isUserAuth();
    const creator = new ActivityCreator(new ActivityRepositoryPrisma());
    dto.accountId = session.user.accountId;
    const result = await creator.exec(dto);
    if (!result?.ok) {
      return { ok: false, message: 'Internal Server Error' };
    }
    return {
      ok: true,
      message: 'Actividad creada',
      data: result.data,
    };
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: 'Internal Server Error' };
  }
}
