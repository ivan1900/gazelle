import { TagInfo } from './TagDto';

export interface NoteInfo {
  id: number;
  accountId: number;
  content: string;
  date: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
  tags: TagInfo[];
}
