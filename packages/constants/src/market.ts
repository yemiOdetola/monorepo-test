export const SUPPORTED_MARKETS = ['en', 'ca'] as const;

export const MARKET_CONFIG = {
  en: {
    name: 'English',
    localeName: 'English',
    defaultCurrency: 'USD',
    languageCodes: ['en'],
  },
  ca: {
    name: 'Canada',
    localeName: 'Canada',
    defaultCurrency: 'CAD',
    languageCodes: ['en', 'fr'],
  },
} as const;

export const DEFAULT_MARKET = SUPPORTED_MARKETS[0];