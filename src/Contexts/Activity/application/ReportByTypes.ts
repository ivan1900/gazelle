import ActivityRepository from '../domain/ActivityRepository';
import ActionsSpec from '../domain/specifications/ActionsSpec';
import ActivitySpec from '../domain/specifications/ActivitySpec';
import { TimeByTypes } from '../domain/TimeByTypes';

interface Params {
  from: Date;
  to: Date;
  accountId: number;
}

export default class ReportByTypes {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async execute(params: Params): Promise<TimeByTypes[]> {
    const { from, to, accountId } = params;

    const actions = await this.activityRepository.getActions(
      ActionsSpec.isSatisfiedByDate({ start: from, end: to, accountId })
    );

    const uniqueActivityId = new Set(
      actions.map((action) => action.activityId)
    );

    const activities = await this.activityRepository.getActivities(
      ActivitySpec.isSatisfiedByIds(Array.from(uniqueActivityId))
    );

    const report: TimeByTypes[] = [];
    for (const activity of activities) {
      const activityActions = actions.filter(
        (action) => action.activityId === activity.id
      );
      const totalTime = activityActions.reduce((acc, action) => {
        const start = new Date(action.start!);
        const end = action.end ? new Date(action.end) : new Date();
        return acc + (end.getTime() - start.getTime());
      }, 0);
      report.push({
        type: activity.type.name,
        color: activity.type.color,
        totalMinutes: totalTime / 60000, // Convert milliseconds to minutes
      });
    }

    return report;
  }
}
