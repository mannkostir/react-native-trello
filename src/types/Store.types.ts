import {Card, Column, Comment, User} from './Common.types';

export type ColumnsState = {
  currentColumns: Column[];
  isLoading: boolean;
  error: string | null;
};
export type CardsState = {
  currentCards: Card[];
  isLoading: boolean;
  error: string | null;
};
export type CommentsState = {
  currentComments: Comment[];
  isLoading: boolean;
  error: string | null;
};
export type AuthState = {
  currentUser: User | null;
  error: string | null;
  isLoading: boolean;
};
