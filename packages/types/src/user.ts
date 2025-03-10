import { Market } from './market';

export interface User {
  id: string;
  username: string;
  password: string;
  market: Market;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}