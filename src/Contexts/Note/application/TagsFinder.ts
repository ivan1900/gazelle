import { TagInfo } from '../domain/TagDto';
import NoteRepository from '../domain/NoteRepository';

export default class TagsFinder {
  constructor(private repository: NoteRepository) {}

  async exec(accountId: number): Promise<TagInfo[]> {
    return this.repository.getTags(accountId);
  }
}
