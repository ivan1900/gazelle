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

  it('should start and stop the timer successfully', async () => {
    (activityRepository.stopTimer as jest.Mock).mockResolvedValueOnce(
      undefined
    );
    (activityRepository.startTimer as jest.Mock).mockResolvedValueOnce(
      undefined
    );

    const result = await activityTimerStarter.exec(1);

    expect(activityRepository.stopTimer).toHaveBeenCalledWith(1);
    expect(activityRepository.startTimer).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it('should return false if stopTimer throws an error', async () => {
    (activityRepository.stopTimer as jest.Mock).mockRejectedValueOnce(
      new Error('Error stopping timer')
    );

    const result = await activityTimerStarter.exec(1);

    expect(activityRepository.stopTimer).toHaveBeenCalledWith(1);
    expect(activityRepository.startTimer).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('should return false if startTimer throws an error', async () => {
    (activityRepository.stopTimer as jest.Mock).mockResolvedValueOnce(
      undefined
    );
    (activityRepository.startTimer as jest.Mock).mockRejectedValueOnce(
      new Error('Error starting timer')
    );

    const result = await activityTimerStarter.exec(1);

    expect(activityRepository.stopTimer).toHaveBeenCalledWith(1);
    expect(activityRepository.startTimer).toHaveBeenCalledWith(1);
    expect(result).toBe(false);
  });
});
