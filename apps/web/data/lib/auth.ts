import users from '../users.json';

interface User {
  id: string;
  username: string;
  password: string;
  market: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export async function authenticateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserByUsername(username: string): Promise<Omit<User, 'password'> | null> {
  const user = users.find((u) => u.username === username);

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
} 