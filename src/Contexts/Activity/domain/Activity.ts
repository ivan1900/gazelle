import DateValueObject from '../../shared/domain/value-object/DateValueObject';
import AccountId from './accountId';
import { ActivityDto } from './AcitvityDto';
import ActivityDescription from './ActivityDescription';
import ActivityName from './ActivityName';
import ActivityStatus from './ActivityStatus';
import ActivityTypeId from './ActivityTypeId';

interface ActivityParms {
  name: ActivityName;
  description: ActivityDescription;
  status: ActivityStatus;
  activityTypeId: ActivityTypeId;
  accountId: AccountId;
  createdAt?: DateValueObject | null | undefined;
  updatedAt?: DateValueObject | null | undefined;
}

export default class Activity {
  readonly name: ActivityName;
  readonly description: ActivityDescription;
  readonly status: ActivityStatus;
  readonly activityTypeId: ActivityTypeId;
  readonly accountId: AccountId;
  readonly createdAt: DateValueObject | null | undefined;
  readonly updatedAt: DateValueObject | null | undefined;

  constructor(props: ActivityParms) {
    this.name = props.name;
    this.description = props.description;
    this.status = props.status;
    this.activityTypeId = props.activityTypeId;
    this.accountId = props.accountId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: ActivityParms): Activity {
    return new Activity(props);
  }

  static fromPrimitives(dto: ActivityDto): Activity {
    return new Activity({
      name: new ActivityName(dto.name),
      description: new ActivityDescription(dto.description),
      status: new ActivityStatus(dto.status),
      activityTypeId: new ActivityTypeId(dto.activityTypeId),
      accountId: new AccountId(dto.accountId || 0), // todo revisar esto
    });
  }

  toPrimitives(): ActivityDto {
    return {
      name: this.name.value,
      description: this.description.value,
      status: this.status.value,
      activityTypeId: this.activityTypeId.value,
      accountId: this.accountId.value,
      createdAt: this.createdAt?.value || null,
      updatedAt: this.updatedAt?.value || null,
    };
  }
}
