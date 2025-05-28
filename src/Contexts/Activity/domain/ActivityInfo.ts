export interface ActivityInfo {
  id: number;
  name: string;
  description: string;
  type: ActivityType;
  status: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  actions: ActionTime[];
}

export interface ActivityType {
  id?: number;
  name: string;
  isProductive: boolean;
  color: string;
}

export interface ActionTime {
  id: number;
  activityId: number;
  start: Date | null;
  end: Date | null;
}
