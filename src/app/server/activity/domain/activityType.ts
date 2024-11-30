interface ActivityTypeParms {
  id: number;
  name: string;
  isProductive: boolean;
  color: string | null;
  clientId: number;
}

export default class ActivityType {
  id: number;
  name: string;
  isProductive: boolean;
  color: string | null;
  clientId: number;

  constructor(params: ActivityTypeParms) {
    this.id = params.id;
    this.name = params.name;
    this.isProductive = params.isProductive;
    this.color = params.color;
    this.clientId = params.clientId;
  }

  static createFrom(params: ActivityTypeParms): ActivityType {
    const { id, name, isProductive, color, clientId } = params;
    return new ActivityType({ id, name, isProductive, color, clientId });
  }
}
