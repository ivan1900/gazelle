import ActivityType from '@server/activity/domain/activityType';
import { ActivityTypeDto } from './activityTypeDto';

export default interface ActivityTypeRepository {
  create(actionType: ActivityType): Promise<ActivityType | null>;
  findByClient(id: number): Promise<ActivityTypeDto[] | []>;
  // findAll(): Promise<ActionType[]>;
  // update(actionType: ActionType): Promise<ActionType | null>;
  // delete(id: string): Promise<boolean>;
}
