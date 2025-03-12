'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [authState, setAuthState] = useState({ isLoggedIn: false, username: '', market: 'en', displayName: '' });

  useEffect(() => {
    const checkAuth = () => {
      const cookies = new Map(
        document.cookie.split('; ').map(cookie => {
          const [key, value] = cookie.split('=');
          return [key, value];
        })
      );
      
      const username = cookies.get('username') || '';
      const market = cookies.get('market') || 'en';
      
      // Get profile data from localStorage
      let displayName = username;
      if (username) {
        const profileData = localStorage.getItem(`profile_${username}`);
        if (profileData) {
          const { firstName, lastName } = JSON.parse(profileData);
          displayName = `${firstName}${lastName ? ` ${lastName}` : ''}`;
        }
      }

      setAuthState({
        isLoggedIn: !!username,
        username,
        market,
        displayName
      });
    };

    checkAuth();
    
    // Listen for cookie changes and localStorage changes
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
              <button
                onClick={() => router.push(`/${market}/my-profile`)}
                className="text-sm font-medium hover:text-gray-200 transition-colors flex items-center"
              >
                <span>Welcome, {authState.displayName}</span>
                <svg className="w-4 h-4 ml-1 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
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