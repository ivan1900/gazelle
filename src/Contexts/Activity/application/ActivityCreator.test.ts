import { ActivityDto } from '../domain/AcitvityDto';
import Activity from '../domain/Activity';
import ActivityRepository from '../domain/ActivityRepository';
import ActivityCreator from './ActivityCreator';

jest.mock('../domain/ActivityRepository');
jest.mock('../domain/Activity');

describe('ActivityCreator', () => {
  let activityCreator: ActivityCreator;
  let activityRepository: ActivityRepository;

  beforeEach(() => {
    activityRepository = {
      findAllOnGoing: jest.fn(),
      create: jest.fn(),
    } as unknown as ActivityRepository;
    activityCreator = new ActivityCreator(activityRepository);
  });

  it('should create a new activity successfully', async () => {
    const dto: ActivityDto = {
      id: '1',
      name: 'Test Activity',
    } as unknown as ActivityDto;
    const newActivity = {
      id: '1',
      name: 'Test Activity',
    } as unknown as Activity;
    (activityRepository.create as jest.Mock).mockResolvedValue(newActivity);

    const result = await activityCreator.exec(dto);

    // expect(activityRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toBe(newActivity);
  });

  it('should return null if an error occurs', async () => {
    const dto: ActivityDto = { id: '1', name: 'Test Activity' } as any;

    (Activity.fromPrimitives as jest.Mock).mockImplementation(() => {
      throw new Error('Test error');
    });

    const result = await activityCreator.exec(dto);

    expect(Activity.fromPrimitives).toHaveBeenCalledWith(dto);
    expect(result).toBeNull();
  });
});
