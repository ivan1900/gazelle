import { ActionTime } from '@/app/server/shared/types/ActivityInfo';
import Activity from './Activity';
import { ActivityInfo } from './ActivityInfo';
import Criteria from '@/Contexts/shared/domain/Criteria/Criteria';
import { ActionUpdateDto } from './ActionUpdateDto';

export default interface ActivityRepository {
  create(activity: Activity): Promise<Activity | null>;
  update(activity: Activity): Promise<void>;
  startTimer({
    accountId,
    activityId,
  }: {
    accountId: number;
    activityId: number;
  }): Promise<void>;
  stopTimer(activityId: number): Promise<void>;
  setActivityAsCompleted(activityId: number): Promise<void>;
  remove(activityId: number): Promise<void>;
  getActivities(criteria: Criteria): Promise<ActivityInfo[]>;
  getActions(criteria: Criteria): Promise<ActionTime[]>;
  getAction({
    actionId,
    accountId,
  }: {
    actionId: number;
    accountId: number;
  }): Promise<ActionTime | null>;
  updateActionTime(dto: ActionUpdateDto): Promise<void>;
}
