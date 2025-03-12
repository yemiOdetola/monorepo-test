'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm({ market }: { market: string }) {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    document.cookie = `market=${market}; path=/`;
    router.push(`/${market}/casino`);
  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
