'use server';

import NoteCreator from '@/Contexts/Note/application/NoteCreator';
import { NoteDto } from '@/Contexts/Note/domain/NoteDto';
import NoteRepositoryPrisma from '@/Contexts/Note/repository/NoteRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';

export default async function createNoteAction(dto: NoteDto) {
  const session = await isUserAuth();
  dto.accountId = session.user.accountId;
  const creator = new NoteCreator(new NoteRepositoryPrisma());
  return creator.exec(dto);
}
