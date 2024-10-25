import { AccountRepository } from '../domain/accountRepository';
import prisma from '../../../db';
import Account from '../domain/account';

export default class AccountRepositoryMysql implements AccountRepository {
  async create(account: Account) {
    const accountCreated = await prisma.user.create({
      data: {
        name: account.name,
        email: account.email,
        google_id: account.googleId,
      },
    });

    // todo crear objeto account si el response es correcto

    return accountCreated;
  }

  async find(email: string) {
    return null;
  }
}
