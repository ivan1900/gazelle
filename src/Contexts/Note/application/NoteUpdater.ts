import Note from '../domain/Note';
import { NoteDto } from '../domain/NoteDto';
import NoteRepository from '../domain/NoteRepository';

export default class NoteUpdater {
  constructor(private repository: NoteRepository) {}

  async exec(dto: NoteDto): Promise<void> {
    const note = Note.fromPrimitives(dto);
    await this.repository.update(note);
  }
}
