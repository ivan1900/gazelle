import prisma from '@/app/db';
import { prismaErrorHandle } from '@/Contexts/shared/domain/constants/PrismaErrors';
import Note from '../domain/Note';
import { NoteInfo } from '../domain/NoteInfo';
import NoteRepository, { NoteFilters } from '../domain/NoteRepository';
import { TagDto, TagInfo } from '../domain/TagDto';

function toNoteInfo(raw: {
  id: number;
  account_id: number;
  content: string;
  date: Date;
  created_at: Date | null;
  updated_at: Date | null;
  note_tag: { tag: { id: number; account_id: number; name: string } }[];
}): NoteInfo {
  return {
    id: raw.id,
    accountId: raw.account_id,
    content: raw.content,
    date: raw.date,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    tags: raw.note_tag.map((nt) => ({
      id: nt.tag.id,
      accountId: nt.tag.account_id,
      name: nt.tag.name,
    })),
  };
}

const NOTE_WITH_TAGS = {
  note_tag: { include: { tag: true } },
} as const;

export default class NoteRepositoryPrisma implements NoteRepository {
  async create(note: Note): Promise<NoteInfo> {
    try {
      const result = await prisma.note.create({
        data: {
          account_id: note.accountId.value,
          content: note.content.value,
          date: note.date.value,
          note_tag: {
            create: note.tagIds.map((tagId) => ({ tag_id: tagId })),
          },
        },
        include: NOTE_WITH_TAGS,
      });
      return toNoteInfo(result);
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async update(note: Note): Promise<void> {
    try {
      await prisma.note_tag.deleteMany({ where: { note_id: note.id! } });
      await prisma.note.update({
        where: { id: note.id! },
        data: {
          content: note.content.value,
          date: note.date.value,
          updated_at: new Date(),
          note_tag: {
            create: note.tagIds.map((tagId) => ({ tag_id: tagId })),
          },
        },
      });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async remove(noteId: number): Promise<void> {
    try {
      await prisma.note_tag.deleteMany({ where: { note_id: noteId } });
      await prisma.note.delete({ where: { id: noteId } });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async findByAccountAndDate(
    accountId: number,
    date: Date
  ): Promise<NoteInfo | null> {
    try {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const result = await prisma.note.findFirst({
        where: {
          account_id: accountId,
          date: { gte: start, lte: end },
        },
        include: NOTE_WITH_TAGS,
      });
      if (!result) return null;
      return toNoteInfo(result);
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async findMany(
    accountId: number,
    filters?: NoteFilters
  ): Promise<NoteInfo[]> {
    try {
      // Build filters dynamically
      const andClauses: object[] = [{ account_id: accountId }];

      if (filters?.dateFrom || filters?.dateTo) {
        const dateFilter: { gte?: Date; lte?: Date } = {};
        if (filters.dateFrom) dateFilter.gte = filters.dateFrom;
        if (filters.dateTo) dateFilter.lte = filters.dateTo;
        andClauses.push({ date: dateFilter });
      }

      if (filters?.search) {
        andClauses.push({ content: { contains: filters.search } });
      }

      if (filters?.tagIds && filters.tagIds.length > 0) {
        andClauses.push({
          note_tag: { some: { tag_id: { in: filters.tagIds } } },
        });
      }

      const results = await prisma.note.findMany({
        where: { AND: andClauses },
        include: NOTE_WITH_TAGS,
        orderBy: { date: 'desc' },
      });

      return results.map(toNoteInfo);
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async createTag(tag: TagDto): Promise<TagInfo> {
    try {
      const result = await prisma.tag.create({
        data: { account_id: tag.accountId, name: tag.name },
      });
      return { id: result.id, accountId: result.account_id, name: result.name };
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async getTags(accountId: number): Promise<TagInfo[]> {
    try {
      const results = await prisma.tag.findMany({
        where: { account_id: accountId },
        orderBy: { name: 'asc' },
      });
      return results.map((t) => ({
        id: t.id,
        accountId: t.account_id,
        name: t.name,
      }));
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }

  async removeTag(tagId: number): Promise<void> {
    try {
      await prisma.note_tag.deleteMany({ where: { tag_id: tagId } });
      await prisma.tag.delete({ where: { id: tagId } });
    } catch (e) {
      throw new Error(prismaErrorHandle(e));
    }
  }
}
