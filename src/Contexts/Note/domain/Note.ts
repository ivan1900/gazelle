import DateValueObject from '@/Contexts/shared/domain/value-object/DateValueObject';
import NoteAccountId from './NoteAccountId';
import NoteContent from './NoteContent';
import NoteDate from './NoteDate';
import { NoteDto } from './NoteDto';

interface NoteParams {
  id?: number;
  accountId: NoteAccountId;
  content: NoteContent;
  date: NoteDate;
  tagIds?: number[];
  createdAt?: DateValueObject | null;
  updatedAt?: DateValueObject | null;
}

export default class Note {
  readonly id?: number;
  readonly accountId: NoteAccountId;
  readonly content: NoteContent;
  readonly date: NoteDate;
  readonly tagIds: number[];
  readonly createdAt: DateValueObject | null | undefined;
  readonly updatedAt: DateValueObject | null | undefined;

  constructor(params: NoteParams) {
    this.id = params.id;
    this.accountId = params.accountId;
    this.content = params.content;
    this.date = params.date;
    this.tagIds = params.tagIds ?? [];
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static fromPrimitives(dto: NoteDto): Note {
    return new Note({
      id: dto.id,
      accountId: new NoteAccountId(dto.accountId),
      content: new NoteContent(dto.content),
      date: new NoteDate(dto.date),
      tagIds: dto.tagIds ?? [],
      createdAt: dto.createdAt ? new NoteDate(dto.createdAt) : null,
      updatedAt: dto.updatedAt ? new NoteDate(dto.updatedAt) : null,
    });
  }

  toPrimitives(): NoteDto {
    return {
      id: this.id,
      accountId: this.accountId.value,
      content: this.content.value,
      date: this.date.value,
      tagIds: this.tagIds,
      createdAt: this.createdAt?.value ?? null,
      updatedAt: this.updatedAt?.value ?? null,
    };
  }
}
