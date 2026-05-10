'use server';

import NoteRemover from '@/Contexts/Note/application/NoteRemover';
import NoteRepositoryPrisma from '@/Contexts/Note/repository/NoteRepositoryPrisma';
import { ActionResponse } from '@/app/server/shared/responseAction';
import isUserAuth from '../../shared/checkUserAuth';

export default async function deleteNoteAction(
  noteId: number
): Promise<ActionResponse> {
  try {
    await isUserAuth();
    const remover = new NoteRemover(new NoteRepositoryPrisma());
    await remover.exec(noteId);
    return { ok: true, message: 'Nota eliminada' };
  } catch (e) {
    if (e instanceof Error) return { ok: false, message: e.message };
    return { ok: false, message: 'Internal Server Error' };
  }
}
