import { Market } from '@repo/types/market';
import { Game } from '@repo/types/game';

export interface GameFilters {
  provider?: string;
  search?: string;
}

export function isGameAvailableInMarket(game: Game, market: Market): boolean {
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
}

export function applyFilters(games: Game[], filters: GameFilters): Game[] {
  return games.filter(game => {
    if (filters.provider && game.provider.name !== filters.provider) {
      return false;
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return game.name.toLowerCase().includes(searchTerm);
    }
    return true;
  });
}

export async function getGames(
  market: Market,
  page: number = 1,
  limit: number = 50,
  filters: GameFilters = {}
): Promise<{ games: Game[]; total: number }> {
  try {
    const queryParams = new URLSearchParams({
      market,
      page: page.toString(),
      limit: limit.toString(),
      filters: JSON.stringify(filters)
    });

    const baseUrl = typeof window === 'undefined' ? 'http://localhost:3000' : '';

    const response = await fetch(`${baseUrl}/api/games?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }

    return response.json();
  } catch (error) {
    console.error('Error loading games:', error);
    return { games: [], total: 0 };
  }
} 