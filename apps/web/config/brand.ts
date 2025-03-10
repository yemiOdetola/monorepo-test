import { Market } from '@repo/types/market';

interface BrandConfig {
  menuPosition: 'top' | 'left' | 'right' | 'bottom';
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  logo: string;
  casinoType: 'CasinoA' | 'CasinoB';
  name: string;
}


export const BRAND_CONFIG: Record<Market, BrandConfig> = {
  en: {
    menuPosition: 'top',
    theme: {
      primary: '#0066cc',
      secondary: '#ff9900',
      background: '#f5f5f5',
      text: '#333333',
    },
    logo: '/images/logo-en.svg',
    name: 'CasinoA',
    casinoType: 'CasinoA',
  },
  ca: {
    menuPosition: 'left',
    theme: {
      primary: '#cc0000',
      secondary: '#00cc66',
      background: '#ffffff',
      text: '#222222',
    },
    logo: '/images/logo-ca.svg',
    name: 'CasinoB',
    casinoType: 'CasinoB',
  },
};