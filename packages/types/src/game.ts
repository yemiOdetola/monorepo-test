export interface Game {
  id: number;
  name: string;
  slug: string;
  desktopGameId: string;
  mobileGameId: string;
  meta: {
    thumbnail: {
      src: string;
    };
  };
  licenses: License[];
  aspectRatio: string;
  hasJackpot: boolean;
  demoModeLoggedIn: boolean;
  demoModeLoggedOut: boolean;
  isLiveGame: boolean;
  provider: {
    logo: string;
    meta: {
      vendorId: string;
    };
    name: string;
    aggregator: string;
    externalKey: string;
  };
  tags: Tag[];
  category: {
    id: number;
    name: string;
  };
  positions: Record<string, number>;
  restrictions: Restriction[];
  certificates: any[];
  seoPage: any;
  localisation: Record<string, Localisation>;
}

interface License {
  id: number;
  key: string;
  name: string;
}

interface Tag {
  id: number;
  name: string;
  type: number;
}

interface Restriction {
  licenses: string[];
  conditions: {
    any: Condition[];
  };
}

interface Condition {
  fact: string;
  value: string[];
  operator: string;
}

interface Localisation {
  meta: {
    thumbnail: {
      src: string;
    };
  };
  name: string;
}