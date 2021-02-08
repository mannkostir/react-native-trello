import {Card, Column, Comment} from './Common.types';

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
  username: string | null;
  userId: string | null;
  error: string | null;
  token: string | null;
  isLoading: boolean;
};
