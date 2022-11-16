import {StateCreator} from 'zustand';
import {IEntity} from '../screens/search-screen';
import {IWatchlistSlice} from './watchlist';

export interface IEntitySlice {
  entities: IEntity[];
  addEntity: (entity: IEntity) => void;
  removeEntity: (entity: IEntity) => void;
}

const initialState = {
  entities: [],
};

export const entitySlice: StateCreator<
  IEntitySlice & IWatchlistSlice,
  [],
  [],
  IEntitySlice
> = (set, get) => ({
  ...initialState,
  addEntity: entity => {
    set(state => ({
      ...state,
      entities: [entity, ...state.entities],
    }));
  },
  removeEntity: entity => {
    const newList = get().entities.filter(
      e =>
        `${e.symbol}:${e.exchange}` !== `${entity.symbol}:${entity.exchange}`,
    );
    set({entities: newList});
  },
});
