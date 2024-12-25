interface AccountType {
  id: number;
  name: string;
  email: string;
  googleId?: string | null;
}

export default class Account {
  id: number;
  name: string;
  email: string;
  googleId: string;

  constructor(params: AccountType) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.googleId = params.googleId || '';
  }

  static createFrom(params: AccountType): Account {
    return new Account(params);
  }
}
