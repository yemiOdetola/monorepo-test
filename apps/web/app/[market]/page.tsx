import { notFound } from 'next/navigation';
import { BRAND_CONFIG } from '@/config/brand';
import { Market } from '@repo/types/market';

type MarketPageProps = {
  params: { market: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MarketPage({ params, searchParams }: MarketPageProps) {
  const { market } = await params;
  const { brand } = await searchParams;

  console.log('market, brand', market, brand);

  const config = BRAND_CONFIG[market as Market];

  if (!['en', 'ca'].includes(market) || !config) {
    notFound();
  }

  const brandSpecificConfig = brand ? {
    ...config,
    name: `${brand} Casino`,
    logo: `/images/${String(brand).toLowerCase()}-logo.svg`,
  } : config;

  return (
    <div style={{ backgroundColor: brandSpecificConfig.theme.primary }}>
      <header>
        <h1>Welcome to {brandSpecificConfig.name} - {market.toUpperCase()} Casino</h1>
        <h1>Welcome to {brandSpecificConfig.name} - {market.toUpperCase()} Casino</h1>
        <h1>Welcome to {brandSpecificConfig.name} - {market.toUpperCase()} Casino</h1>
        <h1>Welcome to {brandSpecificConfig.name} - {market.toUpperCase()} Casino</h1>
        <h1>Welcome to {brandSpecificConfig.name} - {market.toUpperCase()} Casino</h1>
      </header>
      <nav style={{ position: brandSpecificConfig.menuPosition === 'top' ? 'relative' : 'absolute' }}>
        <p>Casino Menu ({brandSpecificConfig.menuPosition})</p>
      </nav>
      <p>Browse our exciting games!</p>
    </div>
  );
}
