import { notFound } from 'next/navigation';
import { BRAND_CONFIG } from '@/config/brand';
import { Market } from '@repo/types/market';

type CasinoPageProps = {
  params: { market: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CasinoPage({ params, searchParams }: CasinoPageProps) {
  const { market } = await params;
  const { brand } = await searchParams;
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
        <img src={brandSpecificConfig.logo} alt={`${brandSpecificConfig.name} Logo`} />
        <h1>Welcome to {brandSpecificConfig.name} - {market.toUpperCase()} Casino</h1>
      </header>
      <nav style={{ position: brandSpecificConfig.menuPosition === 'top' ? 'relative' : 'absolute' }}>
        <p>Casino Menu ({brandSpecificConfig.menuPosition})</p>
      </nav>
      <p>Browse our exciting games!</p>
    </div>
  );
}
