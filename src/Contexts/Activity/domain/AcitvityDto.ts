export interface ActivityDto {
  name: string;
  description: string;
  status: string;
  activityTypeId: number;
  accountId?: number;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
}
