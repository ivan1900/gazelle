import { ActivityStatusOption } from '../../shared/domain/constants/ActivityStatus';
import EnumValueObject from '../../shared/domain/value-object/EnumValueObject';

export default class ActivityStatus extends EnumValueObject<string> {
  constructor(value: string) {
    super(value, [
      ActivityStatusOption.COMPLETED,
      ActivityStatusOption.ON_PROGRESS,
      ActivityStatusOption.WAITING,
    ]);
  }
}
