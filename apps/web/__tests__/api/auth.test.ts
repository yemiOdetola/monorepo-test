import { POST as loginHandler } from '@/app/api/auth/login/route';
import { POST as logoutHandler } from '@/app/api/auth/logout/route';


jest.mock('@/data/users.json', () => ([{
  username: 'testuser',
  market: 'en',
  id: '1',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  createdAt: '2024-03-12'
}]), { virtual: true });


jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init?: ResponseInit) => {
      return new Response(JSON.stringify(data), {
        ...init,
        headers: {
          ...init?.headers,
          'Content-Type': 'application/json',
        },
      });
    }
  }
}));

describe('Auth API', () => {
  describe('Login', () => {
    it('should successfully login with valid username', async () => {
      const request = new Request('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser' })
      });

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ market: 'en' });
    });

    it('should return 401 for invalid username', async () => {
      const request = new Request('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'nonexistent' })
      });

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data).toEqual({ error: 'User not found' });
    });

    it('should return 400 for invalid request body', async () => {
      const request = new Request('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Invalid request' });
    });
  });

  describe('Logout', () => {
    it('should successfully logout', async () => {
      const response = await logoutHandler();
      const data = await response.json();

      expect(data).toEqual({ success: true });
      
      // Check if cookies are deleted
      const cookies = response.headers.get('Set-Cookie')?.split(', ');
      expect(cookies).toContain('username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
      expect(cookies).toContain('market=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    });
  });
}); 