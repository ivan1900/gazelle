import { AccountRepository } from '../domain/accountRepository';
import prisma from '../../../app/db';
import Account from '../domain/account';

export default class AccountRepositoryPrisma implements AccountRepository {
  async create(account: Account): Promise<Account | null> {
    try {
      const accountCreated = await prisma.user.create({
        data: {
          name: account.name,
          email: account.email,
          google_id: account.googleId,
        },
      });

      const accountEntity = Account.createFrom({
        id: accountCreated.id,
        name: accountCreated.name,
        email: accountCreated.email,
        googleId: accountCreated.google_id,
      });

      return accountEntity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async find(email: string) {
    const account = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!account) {
      return null;
    }

    const accountEntity = Account.createFrom({
      id: account.id,
      name: account.name,
      email: account.email,
      googleId: account.google_id,
    });

    return accountEntity;
  }
}
