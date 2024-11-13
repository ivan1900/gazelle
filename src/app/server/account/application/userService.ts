import AccountRepositoryMysql from '../repository/accountRepositoryMysql';

export const userService = {
  authenticate,
  authenticateGoogle,
};

function authenticate(username: string, password: string) {
  return null; // return user if authenticated, null otherwise
}

async function authenticateGoogle(email: string | undefined | null) {
  if (!email) {
    return null;
  }
  const repository = new AccountRepositoryMysql();
  const account = await repository.find(email);
  if (account) {
    return account;
  }
  return null;
}
