export function getDateStart(date: Date): Date {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
}

export function getDateDaysAgo(date: Date, days: number): Date {
  const start = getDateStart(date);
  return new Date(start.getTime() - days * 24 * 60 * 60 * 1000);
}

export function formatDurationTime(time: number): string {
  const totalTime = new Date(time);
  const diffTZ = totalTime.getTimezoneOffset() * 60 * 1000; // this operation is because need diff in milliseconds
  totalTime.setTime(totalTime.getTime() + diffTZ);
  const duration =
    totalTime.getHours().toString().padStart(2, '0') +
    ':' +
    totalTime.getMinutes().toString().padStart(2, '0') +
    ' h';
  return duration;
}
