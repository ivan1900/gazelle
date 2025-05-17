'use server';

import ActionTimeUpdater from '@/Contexts/Activity/application/ActionTimeUpdater';
import { ActionUpdateDto } from '@/Contexts/Activity/domain/ActionUpdateDto';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';
import { ActionResponse } from '../../shared/responseAction';

export default async function actionTimeUpdate(
  actionId: number,
  start: Date | null,
  end: Date | null
): Promise<ActionResponse> {
  const session = await isUserAuth();

  try {
    const actionTimeUpdater = new ActionTimeUpdater(
      new ActivityRepositoryPrisma()
    );

    const updateDto: ActionUpdateDto = {
      id: actionId,
      accountId: session.user.accountId,
      start,
      end,
    };

    await actionTimeUpdater.exec(updateDto);

    return {
      ok: true,
      message: 'Tiempos de actividad actualizados correctamente',
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      message:
        e instanceof Error
          ? e.message
          : 'Error al actualizar los tiempos de actividad',
    };
  }
}
