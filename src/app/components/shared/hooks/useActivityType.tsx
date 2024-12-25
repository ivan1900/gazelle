import getActivityType from '@/app/server/actions/activityType/getActivityTypeAction';
import { ActivityTypeDto } from '@/Contexts/ActivityType/domain/ActivityTypeDto';
import { useEffect, useState } from 'react';

export default function useActivityType() {
  const [activityTypes, setActivityTypes] = useState<ActivityTypeDto[]>([]);
  useEffect(() => {
    loadActivityTypes();
  }, []);

  const loadActivityTypes = async () => {
    const activityTypes = await getActivityType();
    setActivityTypes(activityTypes);
  };

  return { activityTypes, loadActivityTypes };
}
