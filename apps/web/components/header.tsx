'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [authState, setAuthState] = useState({ isLoggedIn: false, username: '', market: 'en' });

  useEffect(() => {
    const checkAuth = () => {
      const cookies = new Map(
        document.cookie.split('; ').map(cookie => {
          const [key, value] = cookie.split('=');
          return [key, value];
        })
      );
      
      setAuthState({
        isLoggedIn: !!cookies.get('username'),
        username: cookies.get('username') || '',
        market: cookies.get('market') || 'en'
      });
    };

    checkAuth();
    
    // Listen for cookie changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname]);

  const market = authState.market;
  const gradientClass = market === 'ca'
    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500'
    : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500';

  const handleLogout = () => {
    document.cookie = 'username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'market=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Dispatch storage event to trigger re-render
    window.dispatchEvent(new Event('storage'));
    router.push(`/${market}/login`);
    router.refresh();
  };

  return (
    <header className={`${gradientClass} text-white`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">Casino {market?.toUpperCase()}</h1>
            <nav>
              <ul className="flex space-x-6">
                {authState.isLoggedIn && (
                  <>
                    <li>
                      <button
                        onClick={() => router.push(`/${market}/casino`)}
                        className="hover:text-gray-200"
                      >
                        Games
                      </button>
                    </li>
                    {market === 'ca' && (
                      <li>
                        <button
                          onClick={() => router.push(`/${market}/tournaments`)}
                          className="hover:text-gray-200"
                        >
                          Tournaments
                        </button>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </nav>
          </div>
          {authState.isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Welcome, {authState.username}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-white/80 hover:text-white underline underline-offset-2"
              >
                Sign Out
              </button>
            </div>
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