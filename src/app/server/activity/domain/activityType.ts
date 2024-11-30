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
}
