import getActions from '@/app/server/actions/activity/getActions';
import getActivities from '@/app/server/actions/activity/getActivities';
import {
  getDateDaysAgo,
  getDateStart,
} from '@/app/server/shared/helpers/dates';
import { ActivityInfo } from '@/Contexts/Activity/domain/ActivityInfo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function useActionSummary(selectedDate: Date) {
  const [activities, setActivities] = useState<ActivityInfo[]>([]);

  useEffect(() => {
    getActivity(selectedDate);
  }, [selectedDate]);

  const getActivity = async (selectedDate: Date) => {
    const startOfDay = dayjs(selectedDate).startOf('day');
    const endOfDay = dayjs(selectedDate).endOf('day');
    const criteria = JSON.stringify({
      filters: [
        {
          field: 'start',
          operator: 'gt',
          value: startOfDay.format('YYYY-MM-DDTHH:mm:ssZ'),
        },
        {
          field: 'end',
          operator: 'lt',
          value: endOfDay.format('YYYY-MM-DDTHH:mm:ssZ'),
        },
      ],
    });
    const actions = await getActions(criteria);

    // setActivities(activities);
  };

  return { activities };
}
