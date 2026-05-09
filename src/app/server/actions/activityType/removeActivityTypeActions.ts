'use server';
import { redirect } from 'next/navigation';
import ActivityTypeRepositoryPrisma from '@/Contexts/ActivityType/repository/ActivityTypeRepositoryPrimsa';
import { ActionResponse } from '@/app/server/shared/responseAction';
import { linkTo } from '../../shared/linkTo';
import { getServerSession } from 'next-auth';

export default async function removeActivityTypeAction(
  name: string
): Promise<ActionResponse> {
  const session = await getServerSession();
  if (!session) {
    redirect(linkTo.LOGIN);
  }

  const repository = new ActivityTypeRepositoryPrisma();
  try {
    const result = await repository.delete(session.user.accountId, name);
    if (result) {
      return {
        ok: true,
        message: 'Tipo de actividad eliminado',
      };
    }
    return {
      ok: false,
      message: 'No se pudo eliminar el tipo de actividad',
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        ok: false,
        message: e.message,
      };
    }
    return {
      ok: false,
      message: 'Error desconocido',
    };
  }
}
