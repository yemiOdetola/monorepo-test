import { NextResponse } from 'next/server';
import users from '@/data/users.json';

export async function POST(request: Request) {
  try {
    const { username } = await request.json();
    const user = users.find(u => u.username === username);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    return NextResponse.json({ market: user.market });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
} 