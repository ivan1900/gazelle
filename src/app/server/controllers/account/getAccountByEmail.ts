'use server';

import UserFinder from '../../account/application/userFinder';
import AccountRepositoryPrisma from '../../account/repository/accountRepositoryPrisma';

export default async function getAccountByEmail(email: string) {
  const repository = new AccountRepositoryPrisma();
  const userFinder = new UserFinder(repository);
  return userFinder.byEmail(email);
}
