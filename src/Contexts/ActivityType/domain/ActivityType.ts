import { ActivityTypeDto } from './ActivityTypeDto';

interface ActivityTypeParms {
  id: number;
  name: string;
  isProductive: boolean;
  color: string | null;
  accountId: number;
}

export default class ActivityType {
  id: number;
  name: string;
  isProductive: boolean;
  color: string | null;
  accountId: number;

  constructor(params: ActivityTypeParms) {
    this.id = params.id;
    this.name = params.name;
    this.isProductive = params.isProductive;
    this.color = params.color;
    this.accountId = params.accountId;
  }

  static createFrom(params: ActivityTypeParms): ActivityType {
    const { id, name, isProductive, color, accountId } = params;
    return new ActivityType({
      id,
      name,
      isProductive,
      color,
      accountId: accountId,
    });
  }

  toPimitives(): ActivityTypeDto {
    return {
      id: this.id,
      name: this.name,
      isProductive: this.isProductive,
      color: this.color,
      accountId: this.accountId,
    };
  }
}
