import { StringValueObject } from '@/Contexts/shared/domain/value-object/StringValueObject';

export default class NoteContent extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
