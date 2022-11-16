import {StateCreator} from 'zustand';
import {IEntitySlice} from './entity';

export interface IWatchlistSlice {
  watchlist: any[];
  updateWatchlist: (entity: string) => void;
}

const initialState = {
  watchlist: [],
};

export const watchlistSlice: StateCreator<
  IEntitySlice & IWatchlistSlice,
  [],
  [],
  IWatchlistSlice
> = set => ({
  ...initialState,
  updateWatchlist: data => {
    set(state => ({watchlist: [...state.watchlist, data]}));
  },
});
