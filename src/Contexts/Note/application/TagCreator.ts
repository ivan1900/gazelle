import { TagDto, TagInfo } from '../domain/TagDto';
import NoteRepository from '../domain/NoteRepository';

export default class TagCreator {
  constructor(private repository: NoteRepository) {}

  async exec(tag: TagDto): Promise<TagInfo> {
    return this.repository.createTag(tag);
  }
}
