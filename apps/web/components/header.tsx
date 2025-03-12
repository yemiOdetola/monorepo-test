'use client';

import { usePathname, useRouter } from 'next/navigation';
import LogoutButton from './logout-button';
import { useMemo } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const market = pathname.split('/')[1];

  const isLoggedIn = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return !!document.cookie.includes('username=');
  }, []);

  const gradientClass = market === 'ca'
    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500'
    : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500';

  return (
    <header className={`${gradientClass} text-white`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">Casino {market?.toUpperCase()}</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href={`/${market}/casino`} className="hover:text-gray-200">
                    Games
                  </a>
                </li>
                <li>
                  <a href={`/${market}/promotions`} className="hover:text-gray-200">
                    Promotions
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full transition-colors backdrop-blur-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 