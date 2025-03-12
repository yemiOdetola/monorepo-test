import { notFound } from 'next/navigation';
import { SUPPORTED_MARKETS } from '@repo/types/market'

interface MarketLayoutProps {
  children: React.ReactNode;
  params: {
    market: string;
  };
}

export default async function MarketLayout({ children, params }: MarketLayoutProps) {
  const { market } = await params;

  if (!SUPPORTED_MARKETS.includes(market as any)) {
    return notFound();
  }

  return (
    <div>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
