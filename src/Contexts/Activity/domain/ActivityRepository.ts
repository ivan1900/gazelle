import { ActivityDto } from './AcitvityDto';
import Activity from './Activity';

export default interface ActivityRepository {
  create(activity: Activity): Promise<Activity | null>;
  findAllNotCompleted(accountId: number): Promise<ActivityDto[]>;
  findCompleted({
    accountId,
    lastDays,
  }: {
    accountId: number;
    lastDays: number;
  }): Promise<ActivityDto[]>;
}
