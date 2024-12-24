export const ActivityStatus = {
  ON_PROGRESS: 'ON_PROGRESS',
  WAITING: 'WAITING',
  COMPLETED: 'COMPLETED',
};

export const ActivityStatusDict = [
  { label: 'En progreso', value: ActivityStatus.ON_PROGRESS },
  { label: 'En espera', value: ActivityStatus.WAITING },
  { label: 'Completado', value: ActivityStatus.COMPLETED },
];
