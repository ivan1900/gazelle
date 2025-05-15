import { ActionTime } from '@/app/server/shared/types/ActivityInfo';
import Activity from './Activity';
import { ActivityInfo } from './ActivityInfo';
import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';

export default interface ActivityRepository {
  create(activity: Activity): Promise<Activity | null>;
  findAllOnGoing(accountId: number): Promise<ActivityInfo[]>;
  findCompleted({
    accountId,
    lastDays,
  }: {
    accountId: number;
    lastDays: number;
  }): Promise<ActivityInfo[]>;
  startTimer({
    accountId,
    activityId,
  }: {
    accountId: number;
    activityId: number;
  }): Promise<void>;
  stopTimer(activityId: number): Promise<void>;
  getActivityOnGoing(accountId: number): Promise<ActivityInfo | null>;
  setActivityAsCompleted(activityId: number): Promise<void>;
  remove(activityId: number): Promise<void>;
  getActivities(criteria: Criteria): Promise<ActivityInfo[]>;
  getActions(criteria: Criteria): Promise<ActionTime[]>;
}
