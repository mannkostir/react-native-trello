import {Prayer, List} from './Common.types';

export type ListsState = {
  currentLists: List[];
};
export type PrayersState = {
  currentPrayers: Prayer[];
};
export type AuthState = {
  username: string | null;
  userId: string | null;
};
