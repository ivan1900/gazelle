'use server';
import { redirect } from 'next/navigation';
import { getServerAuthSession } from '../../auth/auth';
import ActivityTypeRepositoryPrisma from '@/contexts/activity/repository/activityTypeRepositoryPrimsa';
import { ResponseAction } from '@/contexts/shared/responseAction';

export default async function removeActivityTypeAction(
  name: string
): Promise<ResponseAction> {
  const session = await getServerAuthSession();
  if (!session) {
    redirect('/login');
  }

  const repository = new ActivityTypeRepositoryPrisma();
  try {
    const result = await repository.delete(session.user.userId, name);
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
