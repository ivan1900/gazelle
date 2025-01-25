import { ActionTime } from '@/app/server/shared/types/ActivityInfo';
import { useEffect, useState } from 'react';

export default function useTimeHook(actions: ActionTime[]) {
  const [totalDuration, setTotalDuration] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (actions.length > 0) {
      const total = actions.reduce((acc, action) => {
        if (action.start && action.end) {
          const diff = action.end.getTime() - action.start.getTime();
          return acc + diff;
        }
        return acc;
      }, 0);

      setTime(total);
      formatTime(total);
    }
  }, [actions]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const oneMinute = 60 * 1000;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time + oneMinute);
      }, oneMinute);
      formatTime(time);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (time: number) => {
    const totalTime = new Date(time);
    const diffTZ = totalTime.getTimezoneOffset() * 60 * 1000; // this operation is because need diff in milliseconds
    totalTime.setTime(totalTime.getTime() + diffTZ);
    const duration =
      totalTime.getHours().toString().padStart(2, '0') +
      ':' +
      totalTime.getMinutes().toString().padStart(2, '0') +
      ' h';
    setTotalDuration(duration);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return { totalDuration, startTimer, stopTimer };
}
