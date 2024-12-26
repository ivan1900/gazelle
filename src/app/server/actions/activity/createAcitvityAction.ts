'use server';

import ActivityCreator from '@/Contexts/Activity/application/ActivityCreator';
import { ActivityDto } from '@/Contexts/Activity/domain/AcitvityDto';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import { ResponseAction } from '@/Contexts/shared/responseAction';
import { getServerAuthSession } from '../../auth/auth';
import { redirect } from 'next/navigation';

export default async function createActivityAction(
  dto: ActivityDto
): Promise<ResponseAction> {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      redirect('/login');
    }
    const repository = new ActivityRepositoryPrisma();
    const creator = new ActivityCreator(repository);
    dto.accountId = session.user.accountId;
    const result = await creator.exec(dto);
    if (!result) {
      return { ok: false, message: 'Internal Server Error' };
    }
    return {
      ok: true,
      message: 'Actividad creada',
      data: result.toPrimitives(),
    };
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: 'Internal Server Error' };
  }
}
