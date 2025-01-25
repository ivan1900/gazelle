import AccountRepositoryPrisma from '../repository/AccountRepositoryPrisma';
import { accountServiceAuth } from './AccountServiceAuth';

jest.mock('../repository/AccountRepositoryPrisma');

describe('userService', () => {
  describe('authenticateGoogle', () => {
    it('should return null if email is undefined', async () => {
      const result = await accountServiceAuth.authenticateGoogle(undefined);
      expect(result).toBeNull();
    });

    it('should return null if email is null', async () => {
      const result = await accountServiceAuth.authenticateGoogle(null);
      expect(result).toBeNull();
    });

    it('should return null if account is not found', async () => {
      AccountRepositoryPrisma.prototype.find = jest
        .fn()
        .mockResolvedValue(null);
      const result =
        await accountServiceAuth.authenticateGoogle('test@example.com');
      expect(result).toBeNull();
    });

    it('should return account if account is found', async () => {
      const mockAccount = { id: '1234', email: 'test@example.com' };
      AccountRepositoryPrisma.prototype.find = jest
        .fn()
        .mockResolvedValue(mockAccount);
      const result =
        await accountServiceAuth.authenticateGoogle('test@example.com');
      expect(result).toEqual(mockAccount);
    });
  });
});
