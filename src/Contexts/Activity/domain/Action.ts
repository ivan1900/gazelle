interface ActionProps {
  id: number;
  activityId: number;
  start: Date | null;
  end: Date | null;
}

export default class Action {
  readonly id: number;
  readonly activityId: number;
  readonly start: Date | null;
  readonly end: Date | null;

  constructor(props: ActionProps) {
    this.id = props.id;
    this.activityId = props.activityId;
    this.start = props.start;
    this.end = props.end;
  }

  static create(props: ActionProps): Action {
    const { id, activityId, start, end } = props;
    return new Action({ id, activityId, start, end });
  }

  toPrimitives(): {
    id: number;
    activityId: number;
    start: Date | null;
    end: Date | null;
  } {
    return {
      id: this.id,
      activityId: this.activityId,
      start: this.start,
      end: this.end,
    };
  }
}
