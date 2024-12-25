import { cookies } from 'next/headers';
import AccountRepositoryPrisma from '../repository/AccountRepositoryPrisma';
import { cookieNames } from '@/Contexts/shared/constants/cookie';

export const accountServiceAuth = {
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
    const cookieStore = cookies();
    cookieStore.set(cookieNames.ACCOUNT_ID, account.id.toString());
    return account;
  }
  return null;
}
