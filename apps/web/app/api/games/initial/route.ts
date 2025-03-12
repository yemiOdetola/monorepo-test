import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'games.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const games = JSON.parse(jsonData);
    
    return NextResponse.json(games);
  } catch (error) {
    console.error('Error loading initial games data:', error);
    return NextResponse.json(
      { error: 'Failed to load initial games data' },
      { status: 500 }
    );
  }
} 