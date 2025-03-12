import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Market, MarketConfig, SUPPORTED_MARKETS } from "@repo/types/market";
import { MARKET_CONFIGS } from "@repo/constants/market";

export interface MarketState {
  currentMarket: typeof SUPPORTED_MARKETS[number];
  config: MarketConfig;
}

const initialState: MarketState = {
  currentMarket: 'en',
  config: MARKET_CONFIGS.en,
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarket: (state, action: PayloadAction<Market>) => {
      state.currentMarket = action.payload;
      state.config = MARKET_CONFIGS[action.payload];
    },
  },
});

export const { setMarket } = marketSlice.actions;
export const marketReducer = marketSlice.reducer;