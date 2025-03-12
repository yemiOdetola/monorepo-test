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
  return gamesCache ?? [];
}

function filterGamesByMarket(games: Game[], market: string): Game[] {
  return games.filter(game => {
    if (market === 'ca' && game.positions?.CA) {
      return true;
    } else if (market === 'en' && game.positions?.GB) {
      return true;
    }
    
    const restrictions = game.restrictions || [];
    for (const restriction of restrictions) {
      const conditions = restriction.conditions?.any || [];
      for (const condition of conditions) {
        if (condition.fact === 'countryByIp' && 
            condition.operator === 'in' && 
            condition.value.includes(market === 'ca' ? 'CA' : 'GB')) {
          return false;
        }
      }
    }
    return true;
  });
}

function applyFilters(games: Game[], filters: any): Game[] {
  if (!filters || Object.keys(filters).length === 0) return games;
  
  return games.filter(game => {
    if (filters.provider && game.provider !== filters.provider) {
      return false;
    }
    if (filters.search) {
      return game.name.toLowerCase().includes(filters.search.toLowerCase());
    }
    return true;
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const market = searchParams.get('market') || 'en';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const filtersParam = searchParams.get('filters');
  const filters = filtersParam ? JSON.parse(filtersParam) : {};
  
  try {
    const allGames = await loadGames();
    
    // Apply filters first to reduce the dataset
    const marketGames = filterGamesByMarket(allGames, market);
    const filteredGames = applyFilters(marketGames, filters);
    
    // Then paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGames = filteredGames.slice(startIndex, endIndex);
    
    return NextResponse.json({
      games: paginatedGames,
      total: filteredGames.length,
      page,
      limit
    });
  } catch (error) {
    console.error('Error loading games:', error);
    return NextResponse.json(
      { error: 'Failed to load games' },
      { status: 500 }
    );
  }
}