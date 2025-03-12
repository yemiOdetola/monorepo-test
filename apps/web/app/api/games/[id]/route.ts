import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { Game } from '@repo/types/game';

let gamesCache: Game[] | null = null;

async function loadGames(): Promise<Game[]> {
  if (gamesCache) return gamesCache;

  const filePath = path.join(process.cwd(), 'data', 'games.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  gamesCache = JSON.parse(jsonData);
  return gamesCache || [];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const market = request.nextUrl.searchParams.get('market') || 'en';

  try {
    const games = await loadGames();
    const game = games.find(g => g.id === id);

    if (!game) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    const isAvailable = market === 'ca'
      ? (game.positions && game.positions.CA)
      : (game.positions && (game.positions.GB || game.positions.ROW));

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Game not available in this market' },
        { status: 403 }
      );
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error('Error loading game:', error);
    return NextResponse.json(
      { error: 'Failed to load game' },
      { status: 500 }
    );
  }
}