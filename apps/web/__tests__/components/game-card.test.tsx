import { render, screen, fireEvent } from '@testing-library/react';
import { GameCard } from '@/components/game-card';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { marketReducer } from '@/store/slices/market-slice';
import { gameReducer } from '@/store/slices/game-slice';
import { MARKET_CONFIGS } from '@repo/constants/market';
import { Market } from '@repo/types/market';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

const mockGame = {
  id: 1,
  name: 'Test Game',
  slug: 'test-game',
  provider: {
    name: 'Test Provider',
    id: 'test-provider',
    logo: 'test-logo.png',
    meta: {
      vendorId: 'vendor-1'
    },
    aggregator: 'test-aggregator',
    externalKey: 'test-key'
  },
  meta: {
    thumbnail: {
      src: '/test-image.jpg'
    }
  },
  localisation: {
    en_CA: {
      name: 'Test Game CA',
      meta: {
        thumbnail: {
          src: '/test-image-ca.jpg'
        }
      }
    },
    en_ROW: {
      name: 'Test Game ROW',
      meta: {
        thumbnail: {
          src: '/test-image-row.jpg'
        }
      }
    }
  },
  desktopGameId: 'desktop-1',
  mobileGameId: 'mobile-1',
  licenses: [{ id: 1, key: 'license1', name: 'License 1' }],
  aspectRatio: '16:9',
  hasJackpot: false,
  demoModeLoggedIn: true,
  demoModeLoggedOut: false,
  isLiveGame: false,
  tags: [{ id: 1, name: 'slot', type: 1 }],
  category: {
    id: 1,
    name: 'Slots'
  },
  positions: {},
  restrictions: [{
    licenses: ['license1'],
    conditions: {
      any: [{
        fact: 'country',
        value: ['CA'],
        operator: 'equal'
      }]
    }
  }],
  certificates: [],
  seoPage: null
};

describe('GameCard', () => {
  const createWrapper = (market: Market = 'en') => {
    const store = configureStore({
      reducer: {
        market: marketReducer,
        game: gameReducer
      },
      preloadedState: {
        market: {
          currentMarket: market,
          config: MARKET_CONFIGS[market]
        }
      }
    });

    return render(
      <Provider store={store}>
        <GameCard game={mockGame} />
      </Provider>
    );
  };

  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders game name and image for ROW market', () => {
    createWrapper('en');
    
    const image = screen.getByAltText('Test Game ROW');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image-row.jpg');
  });

  it('renders game name and image for CA market', () => {
    createWrapper('ca');
    
    const image = screen.getByAltText('Test Game CA');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image-ca.jpg');
  });

  it('navigates to game page on click', () => {
    createWrapper('en');
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/en/casino/test-game');
  });

  it('shows hover state with game name', () => {
    createWrapper('en');
    
    const gameName = screen.getByText('Test Game ROW');
    expect(gameName).toBeInTheDocument();
  });
}); 