import { ActivityTypeDto } from '../domain/activityTypeDto';
import ActivityTypeRepository from '../domain/activityTypeRepository';

export class GetActivityType {
  constructor(
    private readonly activityTypeRepository: ActivityTypeRepository
  ) {}

  exec(id: number): Promise<ActivityTypeDto[] | []> {
    return this.activityTypeRepository.findByClient(id);
  }
}
