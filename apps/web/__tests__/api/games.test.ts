import { NextRequest, NextResponse } from 'next/server';
import { GET } from '@/app/api/games/route';

const mockGame = {
  id: '1',
  name: 'Test Game',
  provider: 'test-provider',
  positions: { GB: true },
  restrictions: []
};

jest.mock('fs/promises', () => ({
  readFile: jest.fn().mockResolvedValue(JSON.stringify([mockGame]))
}));

jest.mock('next/server', () => {
  class MockNextRequest extends Request {
    constructor(input: RequestInfo | URL, init?: RequestInit) {
      super(input, init);
      this.nextUrl = new URL(input.toString());
    }
    nextUrl: URL;
  }

  return {
    NextRequest: MockNextRequest,
    NextResponse: {
      json: (body: any) => ({
        json: () => Promise.resolve(body)
      })
    }
  };
});

describe('Games API', () => {
  it('returns filtered games for EN market', async () => {
    const request = new NextRequest(
      new URL('http://localhost:3000/api/games?market=en')
    );
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(data.games).toHaveLength(50);
    expect(data.total).toBe(1933);
  });

});