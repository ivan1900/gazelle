import ActivityType from '@/Contexts/ActivityType/domain/ActivityType';
import { ActivityTypeDto } from './ActivityTypeDto';

export default interface ActivityTypeRepository {
  create(actionType: ActivityType): Promise<ActivityType | null>;
  findByAccount(id: number): Promise<ActivityTypeDto[] | []>;
  // update(actionType: ActionType): Promise<ActionType | null>;
  delete(accountId: number, name: string): Promise<ActivityType | null>;
}
