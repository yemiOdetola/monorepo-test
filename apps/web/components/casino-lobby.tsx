'use client';

import { useGames } from '@/data/queries/game';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState, useRef, useEffect } from 'react';
import { Game } from '@repo/types/game';
import { GameCard } from './game-card';

interface CasinoLobbyProps {
  initialGames: Game[];
  totalGames: number;
}

export function CasinoLobby({ initialGames, totalGames }: CasinoLobbyProps) {
  const { currentMarket } = useSelector((state: RootState) => state.market);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [allGames, setAllGames] = useState<Game[]>(initialGames);
  const [_, setColumns] = useState(5);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useGames(currentMarket, page, 50, filters, {
    initialData: { games: initialGames, total: totalGames }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]) return;
        if (entries[0].isIntersecting && !isLoading && allGames.length < (data?.total || 0)) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, allGames.length, data?.total]);


  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(5);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);


  useEffect(() => {
    if (data?.games && !isLoading) {
      if (page === 1) {
        setAllGames(data.games);
      } else {
        const newGames = data.games.filter(newGame =>
          !allGames.some(existingGame =>
            existingGame.id === newGame.id && existingGame.provider.name === newGame.provider.name
          )
        );
        setAllGames(prev => [...prev, ...newGames]);
      }
    }
  }, [data?.games, isLoading, page]);


  if (error) return <div className="text-red-500 p-4">Error loading games: {error.message}</div>;
  if (!data) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Casino Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6">
        {allGames.map((game: Game) => (
          <div key={`${game.id}-${game.provider.name}`} className="min-h-[240px] max-h-[280px] h-full">
            <GameCard game={game} />
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="mt-8 flex justify-center py-4">
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-t-2 border-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading more games...</span>
          </div>
        )}
      </div>
    </div>
  );
}