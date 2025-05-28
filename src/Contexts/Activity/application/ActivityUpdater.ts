import Activity from '../domain/Activity';
import { ActivityDto } from '../domain/AcitvityDto';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActivityUpdater {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(dto: ActivityDto): Promise<void> {
    if (!dto.id) {
      throw new Error(
        'El ID de la actividad es requerido para la actualización'
      );
    }

    const activity = Activity.fromPrimitives(dto);
    await this.repository.update(activity);
  }
}
