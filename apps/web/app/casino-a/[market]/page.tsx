import { notFound } from 'next/navigation';
import { Market, SUPPORTED_MARKETS } from '@repo/types/market';
import { BRAND_FEATURES, BRAND_UI_CONFIG } from '@repo/constants/brands';
import { FeatureCard } from '@/components/feature-card';
import { Gradient } from '@/components/gradient';

type MarketPageProps = {
  params: { market: string };
};

export default function CasinoAMarketPage({ params }: MarketPageProps) {
  const { market } = params;
  const brand = 'casinoA';

  if (!SUPPORTED_MARKETS.includes(market as Market) || !BRAND_FEATURES[brand]) {
    notFound();
  }

  const features = BRAND_FEATURES[brand][market as Market];
  const uiConfig = BRAND_UI_CONFIG[brand];

  const marketGradients = {
    ca: 'from-red-600 via-red-500 to-pink-500',
    en: 'from-blue-600 via-blue-500 to-indigo-500'
  };

  const featureCards = [
    {
      title: 'Local Games',
      description: market === 'ca' ? 'Exclusive Canadian titles and features' : 'UK-specific game selection',
      href: `/${market}/casino`
    },
    features.tournaments && {
      title: 'Tournaments',
      description: market === 'ca' ? 'CAD tournaments' : 'GBP tournaments',
      href: `/${market}/tournaments`
    },
    features.liveCasino && {
      title: 'Live Casino',
      description: 'Real-time gaming experience',
      href: `/${market}/live-casino`
    },
    {
      title: 'Support',
      description: market === 'ca' ? '24/7 Canadian support team' : 'UK-based customer service',
      href: `/${market}/support`
    }
  ].filter(Boolean);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-8 md:p-24 ${uiConfig.menuPosition === 'left' ? 'ml-16' : 'mt-16'
      }`}>
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="z-10 w-full font-mono text-sm mb-12">
          <p className="fixed left-0 top-0 w-full border-b border-neutral-800 bg-zinc-800/30 from-inherit pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
            Welcome to{' '}
            <code className="font-mono font-bold">{market.toUpperCase()}</code>
          </p>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="absolute top-[-100px] opacity-20">
            <Gradient
              className={`w-[800px] h-[500px] bg-gradient-to-r ${marketGradients[market as keyof typeof marketGradients]}`}
              conic
            />
          </div>

          <div className="z-10 mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: uiConfig.theme.primary }}>
              Casino A
            </h1>
            <p className="text-xl text-gray-400">
              {market === 'ca' ? 'Your Canadian Gaming Destination' : 'Your UK Gaming Hub'}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
            {featureCards.map((feature) => feature && (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                href={feature.href}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 