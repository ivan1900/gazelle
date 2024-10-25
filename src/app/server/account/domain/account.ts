interface AccountType {
  id: string;
  name: string;
  email: string;
  googleId?: string;
}

export default class Account {
  id: string;
  name: string;
  email: string;
  googleId: string;

  constructor(params: AccountType) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.googleId = params.googleId ?? '';
  }

  // todo crear metodo statico que devuelve una instancia de account
}
