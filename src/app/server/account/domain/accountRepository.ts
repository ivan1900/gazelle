import Account from './account';

export interface AccountRepository {
  create(account: Account): Promise<Account>;
  find(email: string): Promise<Account | null>;
}
