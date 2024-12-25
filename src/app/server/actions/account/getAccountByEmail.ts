'use server';

import AccountFinder from '@/Contexts/Account/application/AccountFinder';
import AccountRepositoryPrisma from '@/Contexts/Account/repository/AccountRepositoryPrisma';

export default async function getAccountByEmail(email: string) {
  const repository = new AccountRepositoryPrisma();
  const userFinder = new AccountFinder(repository);
  return userFinder.byEmail(email);
}
