import { ActionUpdateDto } from '../domain/ActionUpdateDto';
import ActivityRepository from '../domain/ActivityRepository';

export default class ActionTimeUpdater {
  constructor(private readonly repository: ActivityRepository) {}

  async exec(dto: ActionUpdateDto) {
    const action = await this.repository.getAction({
      actionId: dto.id,
      accountId: dto.accountId,
    });
    if (!action) throw new Error('Acción no encontrada');
    await this.repository.updateActionTime(dto);
  }
}
