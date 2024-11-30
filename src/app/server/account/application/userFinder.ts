import { AccountRepository } from '../domain/accountRepository';

export default class UserFinder {
  constructor(private readonly repository: AccountRepository) {}

  byEmail(email: string) {
    return this.repository.find(email);
  }
}
