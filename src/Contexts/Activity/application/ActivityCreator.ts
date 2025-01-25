import { ResponseDto } from '@/Contexts/shared/domain/types/ResponseDto';
import { ActivityDto } from '../domain/AcitvityDto';
import Activity from '../domain/Activity';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityCreator {
  constructor(private repository: ActivityRepository) {}

  async exec(dto: ActivityDto): Promise<ResponseDto | null> {
    try {
      const activity = Activity.fromPrimitives(dto);
      const newActivity = await this.repository.create(activity);
      return {
        ok: true,
        message: 'Activity created',
        data: newActivity?.toPrimitives(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        message: 'Internal Server Error',
        data: null,
      };
    }
  }
}
