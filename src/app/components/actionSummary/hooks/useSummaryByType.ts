import {
  formatDurationTime,
  getDateDaysAgo,
  getDateStart,
} from '@/app/server/shared/helpers/dates';
import ActivityInfo, {
  ActivityType,
} from '@/app/server/shared/types/ActivityInfo';
import { useCallback, useEffect, useState } from 'react';

interface ActionTypeSummary {
  type: string;
  totalTime: string;
  color: string;
}

export default function useSummaryByType(activities: ActivityInfo[]) {
  const [availableTypes, setAvailableTypes] = useState<ActivityType[]>([]);
  const [summaryBytypes, setSummaryByTypes] = useState<ActionTypeSummary[]>([]);

  useEffect(() => {
    getTypes();
  }, [activities]);

  const getTypes = async () => {
    const types = activities.map((activity) => activity.type);
    const uniqueTypes = Array.from(new Set(types));
    setAvailableTypes(uniqueTypes);
  };

  useEffect(() => {
    getSummaryByType();
  }, [availableTypes]);

  const getSummaryByType = useCallback(() => {
    const summary: ActionTypeSummary[] = [];
    const today = getDateStart(new Date());
    const yesterday = getDateDaysAgo(today, 1);

    for (const type of availableTypes) {
      const activitiesByType = activities.filter(
        (activity) => activity.type === type
      );

      const totalTime = activitiesByType.reduce((acc, activity) => {
        const total = activity.actions.reduce((acc, action) => {
          if (
            action.start &&
            action.end &&
            action.start > yesterday &&
            action.end < today
          ) {
            const diff = action.end.getTime() - action.start.getTime();
            return acc + diff;
          }
          return acc;
        }, 0);
        return acc + total;
      }, 0);

      const formattedTime = formatDurationTime(totalTime);
      summary.push({
        type: type.name,
        color: type.color,
        totalTime: formattedTime,
      });
      setSummaryByTypes(summary);
    }
  }, [availableTypes, activities]);

  return { summaryBytypes };
}
