import type { Market } from '@repo/types/market';

export const CASINO_BRANDS = ['casinoA', 'casinoB'] as const;
export type CasinoBrand = typeof CASINO_BRANDS[number];

export interface BrandFeatures {
  tournaments: boolean;
  liveCasino: boolean;
}

export interface BrandUIConfig {
  menuPosition: 'left' | 'top';
  theme: {
    primary: string;
    secondary: string;
  };
}

export const BRAND_FEATURES: Record<CasinoBrand, Record<Market, BrandFeatures>> = {
  casinoA: {
    ca: {
      tournaments: true,
      liveCasino: true
    },
    en: {
      tournaments: false,
      liveCasino: true
    }
  },
  casinoB: {
    ca: {
      tournaments: true,
      liveCasino: false
    },
    en: {
      tournaments: true,
      liveCasino: true
    }
  }
};

export const BRAND_UI_CONFIG: Record<CasinoBrand, BrandUIConfig> = {
  casinoA: {
    menuPosition: 'left',
    theme: {
      primary: '#FF0000',
      secondary: '#00FF00'
    }
  },
  casinoB: {
    menuPosition: 'top',
    theme: {
      primary: '#0000FF',
      secondary: '#FF00FF'
    }
  }
}; 