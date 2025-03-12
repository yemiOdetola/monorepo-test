'use client';

import { Market } from '@repo/types/market';
import { useQuery } from '@tanstack/react-query';
import { GameFilters, getGames } from '../lib/games';
import { Game } from '@repo/types/game';


const isGameAvailableInMarket = (game: Game, market: Market): boolean => {
  if (market === 'ca' && game.positions && game.positions.CA) {
    return true;
  } else if (market === 'en' && game.positions && game.positions.GB) {
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
};

export interface GamesResponse {
  games: Game[];
  total: number;
}

export function useGames(
  market: Market,
  page = 1,
  pageSize = 20,
  filters: GameFilters = {},
  options: { initialData?: GamesResponse } = {}
) {
  return useQuery<GamesResponse>({
    queryKey: ['games', market, page, pageSize, filters],
    queryFn: async () => {
      const result = await getGames(market, page, pageSize, filters);
      return result;
    },
    staleTime: 0,
    ...options
  });
}

export function useGame(gameId: number, market: Market) {
  return useQuery<Game>({
    queryKey: ['game', gameId, market],
    queryFn: async () => {
      const response = await fetch(`/api/games/${gameId}?market=${market}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch game details');
      }
      
      return response.json();
    },
    enabled: !!gameId,
  });
}

export type { Game, GameFilters };