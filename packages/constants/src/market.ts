import { Market, MarketConfig } from '@repo/types/market';

export const MARKET_CONFIGS: Record<Market, MarketConfig> = {
  en: {
    name: 'English',
    localeName: 'English',
    defaultCurrency: 'USD',
    languageCodes: ['en'],
    menuPosition: 'top',
    theme: {
      primary: '#0066cc',
      secondary: '#ff9900',
      background: '#f5f5f5',
      text: '#333333'
    },
    logo: '/images/logo-en.svg',
    casinoType: 'CasinoA'
  },
  ca: {
    name: 'Canada',
    localeName: 'Canada',
    defaultCurrency: 'CAD',
    languageCodes: ['en', 'fr'],
    menuPosition: 'left',
    theme: {
      primary: '#cc0000',
      secondary: '#00cc66',
      background: '#ffffff',
      text: '#222222'
    },
    logo: '/images/logo-ca.svg',
    casinoType: 'CasinoB'
  }
};
