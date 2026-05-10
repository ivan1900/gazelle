import Note from './Note';
import { NoteInfo } from './NoteInfo';
import { TagDto, TagInfo } from './TagDto';

export interface NoteFilters {
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  tagIds?: number[];
}

export default interface NoteRepository {
  create(note: Note): Promise<NoteInfo>;
  update(note: Note): Promise<void>;
  remove(noteId: number): Promise<void>;
  findByAccountAndDate(accountId: number, date: Date): Promise<NoteInfo | null>;
  findMany(accountId: number, filters?: NoteFilters): Promise<NoteInfo[]>;
  createTag(tag: TagDto): Promise<TagInfo>;
  getTags(accountId: number): Promise<TagInfo[]>;
  removeTag(tagId: number): Promise<void>;
}
