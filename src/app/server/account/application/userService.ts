import AccountRepositoryMysql from '../repository/accountRepositoryMysql';

export const userService = {
  // authenticate,
  authenticateGoogle,
};

// function authenticate(username: string, password: string) {
//   if (username !== 'admin' && password !== 'admin') {
//     return null;
//   }

//   const user = {
//     id: '9001',
//     name: 'Web Admin',
//     email: 'admin@example.com',
//   };

//   return user;
// }

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
