'use server';

import NotesFinder from '@/Contexts/Note/application/NotesFinder';
import { NoteFilters } from '@/Contexts/Note/domain/NoteRepository';
import { NoteInfo } from '@/Contexts/Note/domain/NoteInfo';
import NoteRepositoryPrisma from '@/Contexts/Note/repository/NoteRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';

export default async function getNotesAction(
  filters?: NoteFilters
): Promise<NoteInfo[]> {
  const session = await isUserAuth();
  const finder = new NotesFinder(new NoteRepositoryPrisma());
  return finder.exec(session.user.accountId, filters);
}
