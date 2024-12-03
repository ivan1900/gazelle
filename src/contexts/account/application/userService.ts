import { cookies } from 'next/headers';
import AccountRepositoryPrisma from '../repository/accountRepositoryPrisma';
import { cookieNames } from '@/contexts/shared/constants/cookie';

export const userService = {
  authenticate,
  authenticateGoogle,
};

function authenticate(username: string, password: string) {
  return null; // return user if authenticated, null otherwise
}

async function authenticateGoogle(email: string | undefined | null) {
  if (!email) {
    return null;
  }
  const repository = new AccountRepositoryPrisma();
  const account = await repository.find(email);
  if (account) {
    const cookieStore = await cookies();
    cookieStore.set(cookieNames.CLIENT_ID, account.id.toString());
    return account;
  }
  return null;
}
