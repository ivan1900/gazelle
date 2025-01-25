import { ActivityDto } from '../domain/AcitvityDto';
import Activity from '../domain/Activity';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityCreator {
  constructor(private repository: ActivityRepository) {}

  async exec(dto: ActivityDto): Promise<Activity | null> {
    try {
      const activity = Activity.fromPrimitives(dto);
      const newActivity = await this.repository.create(activity);
      return newActivity;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
