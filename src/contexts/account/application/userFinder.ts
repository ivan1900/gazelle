import { AccountRepository } from '../domain/accountRepository';

export default class UserFinder {
  constructor(private readonly repository: AccountRepository) {}

  byEmail(email: string) {
    if (!email) {
      return null;
    }
    return this.repository.find(email);
  }
}
