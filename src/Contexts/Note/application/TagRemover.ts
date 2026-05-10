import NoteRepository from '../domain/NoteRepository';

export default class TagRemover {
  constructor(private repository: NoteRepository) {}

  async exec(tagId: number): Promise<void> {
    await this.repository.removeTag(tagId);
  }
}
