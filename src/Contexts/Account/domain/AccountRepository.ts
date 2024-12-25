import Account from './Account';

export interface AccountRepository {
  create(account: Account): Promise<Account | null>;
  find(email: string): Promise<Account | null>;
}
