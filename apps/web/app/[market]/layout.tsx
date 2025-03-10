import { notFound } from 'next/navigation';
import { SUPPORTED_MARKETS } from '@repo/constants/market';
import { BRAND_CONFIG } from '@/config/brand';

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

  const brandConfig = BRAND_CONFIG[market as keyof typeof BRAND_CONFIG];

  return (
    <div
      className="market-layout"
      style={{
        '--primary-color': brandConfig.theme.primary,
        '--secondary-color': brandConfig.theme.secondary,
        '--background-color': brandConfig.theme.background,
        '--text-color': brandConfig.theme.text,
      } as React.CSSProperties}
    >
      <h1>Header: {market}</h1>

      <div className={`content-layout menu-${brandConfig.menuPosition}`}>
        <h1>Navigation: {market}</h1>
        <main className="main-content">
          {children}
        </main>
      </div>
      <h1>Footer: {market}</h1>
    </div>
  );
}
