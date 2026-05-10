'use server';

import TagsFinder from '@/Contexts/Note/application/TagsFinder';
import { TagInfo } from '@/Contexts/Note/domain/TagDto';
import NoteRepositoryPrisma from '@/Contexts/Note/repository/NoteRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';

export default async function getTagsAction(): Promise<TagInfo[]> {
  const session = await isUserAuth();
  const finder = new TagsFinder(new NoteRepositoryPrisma());
  return finder.exec(session.user.accountId);
}
