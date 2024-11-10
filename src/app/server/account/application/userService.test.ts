import { userService } from './userService';
import AccountRepositoryMysql from '../repository/accountRepositoryMysql';

jest.mock('../repository/accountRepositoryMysql');

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
      AccountRepositoryMysql.prototype.find = jest.fn().mockResolvedValue(null);
      const result = await userService.authenticateGoogle('test@example.com');
      expect(result).toBeNull();
    });

    it('should return account if account is found', async () => {
      const mockAccount = { id: '1234', email: 'test@example.com' };
      AccountRepositoryMysql.prototype.find = jest
        .fn()
        .mockResolvedValue(mockAccount);
      const result = await userService.authenticateGoogle('test@example.com');
      expect(result).toEqual(mockAccount);
    });
  });
});
