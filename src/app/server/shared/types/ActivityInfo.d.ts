export default interface ActivityInfo {
  id: number;
  name: string;
  description: string;
  type: ActivityType;
  status: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  actions: ActionTime[];
}

interface ActivityType {
  name: string;
  isProductive: boolean;
  color: string;
}

export interface ActionTime {
  id: number;
  start: Date | null;
  end: Date | null;
}
