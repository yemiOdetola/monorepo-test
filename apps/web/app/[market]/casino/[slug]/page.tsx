'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GameDetails() {
  const router = useRouter();
  const selectedGame = useSelector((state: RootState) => state.game.selectedGame);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (!selectedGame) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-4 text-blue-500 hover:text-blue-600 flex items-center gap-2"
        >
          <span>← Return to Games</span>
        </button>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p>The game you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  const handlePlayForReal = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    console.log('Playing for real:', selectedGame.name);
  };

  const handlePlayForFree = () => {
    console.log('Playing demo:', selectedGame.name);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:text-blue-600 flex items-center gap-2"
      >
        <span>← Return to Games</span>
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={selectedGame.meta.thumbnail.src}
            alt={selectedGame.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedGame.name}</h1>
          <p className="text-gray-600 mb-6">Provider: {selectedGame.provider.name}</p>

          <div className="space-y-4">
            {!isAuthenticated && (
              <button
                onClick={handlePlayForFree}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Play for Free
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={handlePlayForReal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Play for Real
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 