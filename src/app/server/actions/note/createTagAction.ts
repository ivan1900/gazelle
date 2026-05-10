'use server';

import TagCreator from '@/Contexts/Note/application/TagCreator';
import { TagDto, TagInfo } from '@/Contexts/Note/domain/TagDto';
import NoteRepositoryPrisma from '@/Contexts/Note/repository/NoteRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';

export default async function createTagAction(name: string): Promise<TagInfo> {
  const session = await isUserAuth();
  const creator = new TagCreator(new NoteRepositoryPrisma());
  const dto: TagDto = { accountId: session.user.accountId, name };
  return creator.exec(dto);
}
