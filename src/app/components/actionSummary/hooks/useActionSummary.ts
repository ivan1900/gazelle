import getActivities from '@/app/server/actions/activity/getActivities';
import {
  getDateDaysAgo,
  getDateStart,
} from '@/app/server/shared/helpers/dates';
import { ActivityInfo } from '@/Contexts/Activity/domain/ActivityInfo';
import { useEffect, useState } from 'react';

export default function useActionSummary() {
  const [activities, setActivities] = useState<ActivityInfo[]>([]);

  useEffect(() => {
    getActivity();
  }, []);

  const getActivity = async () => {
    const today = getDateStart(new Date());
    const yesterday = getDateDaysAgo(today, 1);
    const criteria = JSON.stringify({
      filters: [
        { field: 'updated_at', operator: 'gt', value: yesterday.toISOString() },
        { field: 'updated_at', operator: 'lt', value: today.toISOString() },
      ],
    });
    const activities = await getActivities(criteria);
    setActivities(activities);
  };

  return { activities };
}
