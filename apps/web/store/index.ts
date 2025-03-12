import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user-slice';
import { marketReducer } from './slices/market-slice';
import { gameReducer } from './slices/game-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    market: marketReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;