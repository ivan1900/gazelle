import { ActivityTypeDto } from '../domain/ActivityTypeDto';
import ActivityTypeRepository from '../domain/ActivityTypeRepository';

export class GetActivityType {
  constructor(
    private readonly activityTypeRepository: ActivityTypeRepository
  ) {}

  exec(AccountId: number): Promise<ActivityTypeDto[] | []> {
    return this.activityTypeRepository.findByAccount(AccountId);
  }
}
