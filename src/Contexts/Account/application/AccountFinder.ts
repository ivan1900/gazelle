import { AccountRepository } from '../domain/AccountRepository';

export default class AccountFinder {
  constructor(private readonly repository: AccountRepository) {}

  byEmail(email: string) {
    if (!email) {
      return null;
    }
    return this.repository.find(email);
  }
}
