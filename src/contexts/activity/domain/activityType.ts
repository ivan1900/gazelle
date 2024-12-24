import { ActivityTypeDto } from './activityTypeDto';

interface ActivityTypeParms {
  id: number;
  name: string;
  isProductive: boolean;
  color: string | null;
  userId: number;
}

export default class ActivityType {
  id: number;
  name: string;
  isProductive: boolean;
  color: string | null;
  userId: number;

  constructor(params: ActivityTypeParms) {
    this.id = params.id;
    this.name = params.name;
    this.isProductive = params.isProductive;
    this.color = params.color;
    this.userId = params.userId;
  }

  static createFrom(params: ActivityTypeParms): ActivityType {
    const { id, name, isProductive, color, userId } = params;
    return new ActivityType({ id, name, isProductive, color, userId });
  }

  toPimitives(): ActivityTypeDto {
    return {
      id: this.id,
      name: this.name,
      isProductive: this.isProductive,
      color: this.color,
      userId: this.userId,
    };
  }
}
