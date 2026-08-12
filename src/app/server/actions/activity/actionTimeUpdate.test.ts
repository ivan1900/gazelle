import ActionTimeUpdater from '@/Contexts/Activity/application/ActionTimeUpdater';
import ActivityRepositoryPrisma from '@/Contexts/Activity/repository/ActivityRepositoryPrisma';
import isUserAuth from '../../shared/checkUserAuth';
import actionTimeUpdate from './actionTimeUpdate';

jest.mock('@/Contexts/Activity/application/ActionTimeUpdater', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@/Contexts/Activity/repository/ActivityRepositoryPrisma', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../shared/checkUserAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('actionTimeUpdate', () => {
  const accountId = 7;
  const actionId = 42;
  const start = new Date('2026-08-12T09:00:00.000Z');
  const end = new Date('2026-08-12T10:00:00.000Z');
  const repository = {};
  const exec = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (isUserAuth as jest.Mock).mockResolvedValue({
      user: { accountId },
    });
    (ActivityRepositoryPrisma as jest.Mock).mockImplementation(
      () => repository
    );
    (ActionTimeUpdater as jest.Mock).mockImplementation(() => ({ exec }));
  });

  it('should update the action times using the authenticated account', async () => {
    const result = await actionTimeUpdate(actionId, start, end);

    expect(isUserAuth).toHaveBeenCalledTimes(1);
    expect(ActivityRepositoryPrisma).toHaveBeenCalledTimes(1);
    expect(ActionTimeUpdater).toHaveBeenCalledWith(repository);
    expect(exec).toHaveBeenCalledWith({
      id: actionId,
      accountId,
      start,
      end,
    });
    expect(result).toEqual({
      ok: true,
      message: 'Tiempos de actividad actualizados correctamente',
    });
  });

  it('should allow null start and end times', async () => {
    const result = await actionTimeUpdate(actionId, null, null);

    expect(exec).toHaveBeenCalledWith({
      id: actionId,
      accountId,
      start: null,
      end: null,
    });
    expect(result.ok).toBe(true);
  });

  it('should return the domain error message when updating fails', async () => {
    const error = new Error('Acción no encontrada');
    exec.mockRejectedValueOnce(error);

    const result = await actionTimeUpdate(actionId, start, end);

    expect(result).toEqual({ ok: false, message: error.message });
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it('should return the fallback message for non-Error failures', async () => {
    exec.mockRejectedValueOnce('unexpected failure');

    const result = await actionTimeUpdate(actionId, start, end);

    expect(result).toEqual({
      ok: false,
      message: 'Error al actualizar los tiempos de actividad',
    });
  });
});
