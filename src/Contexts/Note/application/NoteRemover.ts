import NoteRepository from '../domain/NoteRepository';

export default class NoteRemover {
  constructor(private repository: NoteRepository) {}

  async exec(noteId: number): Promise<void> {
    await this.repository.remove(noteId);
  }
}
