import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game } from '@repo/types/game';

const initialState = {
  selectedGame: null as Game | null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSelectedGame: (state, action: PayloadAction<Game>) => {
      state.selectedGame = action.payload;
    },
  },
});

export const { setSelectedGame } = gameSlice.actions;
export const gameReducer = gameSlice.reducer; 