import ActivityRepository from '../domain/ActivityRepository';
import ActivityTimerStarter from './AcitvityTimerStarter';

describe('ActivityTimerStarter', () => {
  let activityRepository: ActivityRepository;
  let activityTimerStarter: ActivityTimerStarter;

  beforeEach(() => {
    activityRepository = {
      stopTimer: jest.fn(),
      startTimer: jest.fn(),
    } as unknown as ActivityRepository;
    activityTimerStarter = new ActivityTimerStarter(activityRepository);
  });

  it('should stop and start the timer for the given activityId', async () => {
    const activityId = 1;

    await activityTimerStarter.exec(activityId);

    expect(activityRepository.stopTimer).toHaveBeenCalledWith(activityId);
    expect(activityRepository.startTimer).toHaveBeenCalledWith(activityId);
  });

  it('should throw an error if stopTimer fails', async () => {
    const activityId = 1;
    const error = new Error('stopTimer failed');
    (activityRepository.stopTimer as jest.Mock).mockRejectedValueOnce(error);

    await expect(activityTimerStarter.exec(activityId)).rejects.toThrow(error);
    expect(activityRepository.stopTimer).toHaveBeenCalledWith(activityId);
    expect(activityRepository.startTimer).not.toHaveBeenCalled();
  });

  it('should throw an error if startTimer fails', async () => {
    const activityId = 1;
    const error = new Error('startTimer failed');
    (activityRepository.startTimer as jest.Mock).mockRejectedValueOnce(error);

    await expect(activityTimerStarter.exec(activityId)).rejects.toThrow(error);
    expect(activityRepository.stopTimer).toHaveBeenCalledWith(activityId);
    expect(activityRepository.startTimer).toHaveBeenCalledWith(activityId);
  });
});
