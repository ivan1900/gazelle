import ActivitiesOnGoingFinder from './ActivitiesOnGoingFinder';
import { ActivityInfo } from '../domain/ActivityInfo';
import ActivityRepository from '../domain/ActivityRepository';

describe('ActivitiesOnGoingFinder', () => {
  let activityRepository: ActivityRepository;
  let activitiesOnGoingFinder: ActivitiesOnGoingFinder;

  beforeEach(() => {
    activityRepository = {
      getActivities: jest.fn(),
    } as unknown as ActivityRepository;
    activitiesOnGoingFinder = new ActivitiesOnGoingFinder(activityRepository);
  });

  it('should return ongoing activities for a given accountId', async () => {
    const accountId = 1;
    const activities: ActivityInfo[] = [
      { id: 1, name: 'Activity 1', status: 'ongoing' } as ActivityInfo,
      { id: 2, name: 'Activity 2', status: 'ongoing' } as ActivityInfo,
    ];
    (activityRepository.getActivities as jest.Mock).mockResolvedValue(
      activities
    );

    const result = await activitiesOnGoingFinder.exec(accountId);

    expect(result).toEqual(activities);
    expect(activityRepository.getActivities).toHaveBeenCalled();
  });

  it('should throw an error if repository throws an error', async () => {
    const accountId = 1;
    const error = new Error('Repository error');
    (activityRepository.getActivities as jest.Mock).mockRejectedValue(error);

    await expect(activitiesOnGoingFinder.exec(accountId)).rejects.toThrow(
      error
    );
    expect(activityRepository.getActivities).toHaveBeenCalled();
  });
});
