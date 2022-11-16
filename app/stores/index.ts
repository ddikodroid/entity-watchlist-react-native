import create from 'zustand';
import {createSelectorHooks} from 'auto-zustand-selectors-hook';
import {entitySlice, IEntitySlice} from './entity';
import {IWatchlistSlice, watchlistSlice} from './watchlist';

const rootStore = create<IEntitySlice & IWatchlistSlice>((...args) => ({
  ...entitySlice(...args),
  ...watchlistSlice(...args),
}));

export const store = createSelectorHooks(rootStore);
