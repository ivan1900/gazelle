export interface ActivityDto {
  id?: number;
  name: string;
  description: string;
  status: string;
  activityTypeId: number;
  accountId?: number;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
}
