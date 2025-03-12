export const SUPPORTED_MARKETS = ['en', 'ca'] as const;
export type Market = typeof SUPPORTED_MARKETS[number];

export interface MarketConfig {
  name: string;
  localeName: string;
  defaultCurrency: string;
  languageCodes: string[];
  menuPosition: 'top' | 'left' | 'right' | 'bottom';
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  logo: string;
  casinoType: 'CasinoA' | 'CasinoB';
}