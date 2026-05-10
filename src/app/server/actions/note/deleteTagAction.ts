'use server';

import TagRemover from '@/Contexts/Note/application/TagRemover';
import NoteRepositoryPrisma from '@/Contexts/Note/repository/NoteRepositoryPrisma';
import { ActionResponse } from '@/app/server/shared/responseAction';
import isUserAuth from '../../shared/checkUserAuth';

export default async function deleteTagAction(
  tagId: number
): Promise<ActionResponse> {
  try {
    await isUserAuth();
    const remover = new TagRemover(new NoteRepositoryPrisma());
    await remover.exec(tagId);
    return { ok: true, message: 'Etiqueta eliminada' };
  } catch (e) {
    if (e instanceof Error) return { ok: false, message: e.message };
    return { ok: false, message: 'Internal Server Error' };
  }
}
