import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Market } from '@repo/types/market';
import { BRAND_FEATURES, BRAND_UI_CONFIG, type CasinoBrand } from '@repo/constants/brands';

type MarketPageProps = {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${small ? "blur-[32px]" : "blur-[75px]"
        } ${conic ? "bg-glow-conic" : ""} ${className ?? ""}`}
    />
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
}

function FeatureCard({ title, description, href }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-lg px-5 py-4 transition-colors hover:text-gray-400"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50 group-hover:opacity-70">
        {description}
      </p>
    </Link>
  );
}

export default async function MarketPage({ params, searchParams }: MarketPageProps) {
  const { market } = await params;
  const brand = (await searchParams).brand as CasinoBrand || 'casinoA';

  if (!['en', 'ca'].includes(market) || !BRAND_FEATURES[brand]) {
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
            <h1 className="text-4xl font-bold mb-4">{brand}</h1>
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
