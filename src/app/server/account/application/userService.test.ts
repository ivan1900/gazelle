import { userService } from './userService';
import AccountRepositoryPrisma from '../repository/accountRepositoryPrisma';

jest.mock('../repository/accountRepositoryPrisma');

describe('userService', () => {
  describe('authenticateGoogle', () => {
    it('should return null if email is undefined', async () => {
      const result = await userService.authenticateGoogle(undefined);
      expect(result).toBeNull();
    });

    it('should return null if email is null', async () => {
      const result = await userService.authenticateGoogle(null);
      expect(result).toBeNull();
    });

    it('should return null if account is not found', async () => {
      AccountRepositoryPrisma.prototype.find = jest
        .fn()
        .mockResolvedValue(null);
      const result = await userService.authenticateGoogle('test@example.com');
      expect(result).toBeNull();
    });

    it('should return account if account is found', async () => {
      const mockAccount = { id: '1234', email: 'test@example.com' };
      AccountRepositoryPrisma.prototype.find = jest
        .fn()
        .mockResolvedValue(mockAccount);
      const result = await userService.authenticateGoogle('test@example.com');
      expect(result).toEqual(mockAccount);
    });
  });
});
