'use server';

import NoteUpdater from '@/Contexts/Note/application/NoteUpdater';
import { NoteDto } from '@/Contexts/Note/domain/NoteDto';
import NoteRepositoryPrisma from '@/Contexts/Note/repository/NoteRepositoryPrisma';
import { ActionResponse } from '@/app/server/shared/responseAction';
import isUserAuth from '../../shared/checkUserAuth';

export default async function updateNoteAction(
  dto: NoteDto
): Promise<ActionResponse> {
  try {
    const session = await isUserAuth();
    dto.accountId = session.user.accountId;
    const updater = new NoteUpdater(new NoteRepositoryPrisma());
    await updater.exec(dto);
    return { ok: true, message: 'Nota actualizada' };
  } catch (e) {
    if (e instanceof Error) return { ok: false, message: e.message };
    return { ok: false, message: 'Internal Server Error' };
  }
}
