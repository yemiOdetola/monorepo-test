import { Market } from '@repo/types/market';

interface BrandConfig {
  name: string;
  logo?: string;
  features: {
    tournaments: boolean;
  };
}

export const BRAND_CONFIG: Record<Market, BrandConfig> = {
  ca: {
    name: 'Casino Canada',
    logo: '/images/casino-logo.svg',
    features: {
      tournaments: true,
    }
  },
  en: {
    name: 'Casino UK',
    logo: '/images/casino-logo.svg',
    features: {
      tournaments: false,
    }
  }
}; 