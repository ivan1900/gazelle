export interface NoteDto {
  id?: number;
  accountId: number;
  content: string;
  date: Date;
  tagIds?: number[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
