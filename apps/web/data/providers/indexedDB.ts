import { Game } from '@repo/types/game';
import { Market } from '@repo/types/market';

const DB_NAME = 'gamesDB';
const STORE_NAME = 'games';
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

export async function initDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('provider', 'provider', { unique: false });
        store.createIndex('market_ca', 'positions.CA', { unique: false });
        store.createIndex('market_gb', 'positions.GB', { unique: false });
      }
    };
  });
}

export async function populateGames(games: Game[]): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    transaction.onerror = () => reject(transaction.error);
    
    store.clear().onsuccess = () => {
      games.forEach(game => store.add(game));
    };
    
    transaction.oncomplete = () => resolve();
  });
}

interface GameFilters {
  provider?: string;
  search?: string;
}

function filterGame(game: Game, market: Market, filters: GameFilters): boolean {
  if (market === 'ca' && !game.positions?.CA) return false;
  if (market === 'en' && !game.positions?.GB) return false; 

  if (filters.provider && game.provider.name !== filters.provider) return false;

  if (filters.search && !game.name.toLowerCase().includes(filters.search.toLowerCase())) {
    return false;
  }

  return true;
}

export async function getGames(
  market: Market,
  page: number = 1,
  limit: number = 50,
  filters: GameFilters = {}
): Promise<{ games: Game[]; total: number }> {
  if (!db) throw new Error('Database not initialized');
  const database = db;

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const games: Game[] = [];

    const request = store.openCursor();
    let count = 0;
    let skipped = 0;
    const skip = (page - 1) * limit;

    request.onerror = () => reject(request.error);
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      
      if (cursor) {
        const game = cursor.value as Game;
        
        if (filterGame(game, market, filters)) {
          if (skipped >= skip && count < limit) {
            games.push(game);
            count++;
          }
          skipped++;
        }
        
        cursor.continue();
      } else {
        resolve({ games, total: skipped });
      }
    };
  });
}