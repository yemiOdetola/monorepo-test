'use client';

import { Card } from "@repo/ui/card";
import { useEffect, useState } from "react";

export default function Page() {
  const [market, setMarket] = useState('en');

  useEffect(() => {
    const checkMarket = () => {
      const cookies = new Map(
        document.cookie.split('; ').map(cookie => {
          const [key, value] = cookie.split('=');
          return [key, value];
        })
      );
      
      setMarket(cookies.get('market') || 'en');
    };

    checkMarket();
    
    // Listen for cookie changes
    window.addEventListener('storage', checkMarket);
    return () => window.removeEventListener('storage', checkMarket);
  }, []);

  const ROUTES = [
    {
      title: "Casino A",
      href: `/casino-a/${market}`,
      description: "Experience our premium selection of casino games in Casino A.",
    },
    {
      title: "Casino B",
      href: `/casino-b/${market}`,
      description: "Discover a different variety of games in Casino B.",
    },
    {
      title: "Main Casino",
      href: `/${market}/casino`,
      description: "Visit our main casino lobby with all available games.",
    },
    {
      title: "Login",
      href: "/login",
      description: "Sign in to access your account and start playing.",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-8">
      <div className="z-10 w-full max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold text-center">Welcome to Our Casino</h1>
        
        <div className="grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {ROUTES.map(({ title, href, description }) => (
            <Card href={href} key={title} title={title}>
              {description}
            </Card>
          ))}
        </div>
      </div>

      <footer className="py-6 mt-12 text-center text-gray-400">
        <p>© 2024 Casino Platform. All rights reserved.</p>
      </footer>
    </main>
  );
}
