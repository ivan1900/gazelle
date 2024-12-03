'use server';

import UserFinder from '@/contexts/account/application/userFinder';
import AccountRepositoryPrisma from '@/contexts/account/repository/accountRepositoryPrisma';

export default async function getAccountByEmail(email: string) {
  const repository = new AccountRepositoryPrisma();
  const userFinder = new UserFinder(repository);
  return userFinder.byEmail(email);
}
