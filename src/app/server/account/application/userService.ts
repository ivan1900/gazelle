export const userService = {
  authenticate,
  authenticateGoogle,
};

function authenticate(username: string, password: string) {
  if (username !== 'admin' && password !== 'admin') {
    return null;
  }

  const user = {
    id: '9001',
    name: 'Web Admin',
    email: 'admin@example.com',
  };

  return user;
}

async function authenticateGoogle(email: string | undefined | null) {
  if (email !== 'ivan1900@gmail.com') {
    return false;
  }

  const user = {
    id: '9002',
    name: 'Google User',
    email,
  };

  return user;
}
