'use client';

import { memo } from 'react';
import { Game } from '@repo/types/game';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setSelectedGame } from '@/store/slices/game-slice';

interface GameCardProps {
  game: Game;
}

export const GameCard = memo(function GameCard({ game }: GameCardProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentMarket } = useSelector((state: RootState) => state.market);

  const localeKey = currentMarket === 'ca' ? 'en_CA' : 'en_ROW';
  const localizedData = game.localisation[localeKey];
  
  const localizedGame = {
    ...game,
    name: localizedData?.name || game.name,
    meta: {
      ...game.meta,
      thumbnail: localizedData?.meta?.thumbnail || game.meta.thumbnail
    }
  };

  const handleClick = () => {
    dispatch(setSelectedGame(localizedGame));
    router.push(`/${currentMarket}/casino/${game.slug}`);
  };

  return (
    <button 
      onClick={handleClick}
      className="group block relative w-full aspect-[4/3] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all text-left"
    >
      <Image
        src={localizedGame.meta.thumbnail.src}
        alt={localizedGame.name}
        width={280}
        height={280}
        className="object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium truncate">
            {localizedGame.name}
          </h3>
        </div>
      </div>
    </button>
  );
});