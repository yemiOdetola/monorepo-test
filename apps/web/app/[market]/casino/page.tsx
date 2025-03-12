import { CasinoLobby } from '@/components/casino-lobby';
import { Suspense } from 'react';
import { getGames } from '@/data/lib/games';
import { Market } from '@repo/types/market';

export default async function CasinoPage({
  params
}: {
  params: Promise<{ market: string }>
}) {
  const { market } = await params;

  const { games, total } = await getGames(market as Market, 1, 50);

  return (
    <main>
      <Suspense fallback={<div>Loading games...</div>}>
        <CasinoLobby initialGames={games} totalGames={total} />
      </Suspense>
    </main>
  );
}