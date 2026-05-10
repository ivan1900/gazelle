import Note from '../domain/Note';
import { NoteDto } from '../domain/NoteDto';
import { NoteInfo } from '../domain/NoteInfo';
import NoteRepository from '../domain/NoteRepository';

export interface NoteCreatorResult {
  note: NoteInfo;
  isNew: boolean;
}

export default class NoteCreator {
  constructor(private repository: NoteRepository) {}

  async exec(dto: NoteDto): Promise<NoteCreatorResult> {
    const existing = await this.repository.findByAccountAndDate(
      dto.accountId,
      dto.date
    );
    if (existing) {
      return { note: existing, isNew: false };
    }
    const note = Note.fromPrimitives(dto);
    const created = await this.repository.create(note);
    return { note: created, isNew: true };
  }
}
