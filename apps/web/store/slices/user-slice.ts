import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@repo/types/user';

export interface UserState {
  profile: User | null;
  isAuthenticated: boolean;
  marketRegion: 'en' | 'ca' | null;
}

const initialState: UserState = {
  profile: null,
  isAuthenticated: false,
  marketRegion: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
      state.marketRegion = action.payload.market as 'en' | 'ca';
    },
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;