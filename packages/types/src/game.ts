export interface Game {
  id: string;
  name: string;
  thumbnail: string;
  category: 'table' | 'live' | 'jackpot' | 'other';
  provider: 'microgaming' | 'playtech' | 'other';
}