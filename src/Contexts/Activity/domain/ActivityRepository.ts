import { ActivityDto } from './AcitvityDto';
import Activity from './Activity';
import { ActivityInfo } from './ActivityInfo';

export default interface ActivityRepository {
  create(activity: Activity): Promise<Activity | null>;
  findAllOnGoing(accountId: number): Promise<ActivityInfo[]>;
  findCompleted({
    accountId,
    lastDays,
  }: {
    accountId: number;
    lastDays: number;
  }): Promise<ActivityDto[]>;
  startTimer(activityId: number): Promise<void>;
  stopTimer(activityId: number): Promise<void>;
}
