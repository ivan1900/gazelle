import ActivityType from '@/contexts/activity/domain/activityType';
import { ActivityTypeDto } from './activityTypeDto';

export default interface ActivityTypeRepository {
  create(actionType: ActivityType): Promise<ActivityType | null>;
  findByClient(id: number): Promise<ActivityTypeDto[] | []>;
  // update(actionType: ActionType): Promise<ActionType | null>;
  delete(userId: number, name: string): Promise<ActivityType | null>;
}
