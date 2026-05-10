import { NoteInfo } from '../domain/NoteInfo';
import NoteRepository, { NoteFilters } from '../domain/NoteRepository';

export default class NotesFinder {
  constructor(private repository: NoteRepository) {}

  async exec(accountId: number, filters?: NoteFilters): Promise<NoteInfo[]> {
    return this.repository.findMany(accountId, filters);
  }
}
