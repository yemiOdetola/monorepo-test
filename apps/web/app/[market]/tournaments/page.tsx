'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TournamentsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const market = pathname.split('/')[1];

  useEffect(() => {
    if (market !== 'ca') {
      router.push(`/${market}/casino`);
    }
  }, [market, router]);

  if (market !== 'ca') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Casino Tournaments
            </h1>
            <p className="text-lg text-gray-400">
              Exclusive competitions for our Canadian players
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-8 mb-12 border border-indigo-500/20 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Canadian Exclusive Events
                </h2>
                <p className="text-gray-300">
                  Join exclusive tournaments with amazing prizes and compete against the best players in Canada.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl p-6 border border-blue-500/20 shadow-lg transition-transform hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🎰</span>
                <h3 className="text-xl font-semibold text-white">
                  Weekly Slots Tournament
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-blue-300 font-medium">
                  $10,000 Prize Pool
                </p>
                <p className="text-gray-400">
                  Every Monday at 12:00 PM EST
                </p>
                <div className="pt-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 rounded-xl p-6 border border-emerald-500/20 shadow-lg transition-transform hover:scale-[1.02]">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">♠️</span>
                <h3 className="text-xl font-semibold text-white">
                  Monthly Poker Championship
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-emerald-300 font-medium">
                  $50,000 Prize Pool
                </p>
                <p className="text-gray-400">
                  Last weekend of every month
                </p>
                <div className="pt-4">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-amber-900/20 rounded-xl p-6 border border-amber-500/20">
            <div className="flex items-center justify-center text-center">
              <span className="text-2xl mr-3">🍁</span>
              <p className="text-amber-200">
                These tournaments are exclusively available for Canadian players
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 