export default interface ActivityInfo {
  id: number;
  name: string;
  description: string;
  type: ActivityType;
  status: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface ActivityType {
  name: string;
  isProductive: boolean;
  color: string;
}
