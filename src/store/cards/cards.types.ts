import {Card, Column} from '@/types/Common.types';

export type GetAllCardsParams = {
  token: string;
};
export type GetAllCardsResponse = Card[];

export type CreateCardParams = {
  token: string;
} & Pick<Card, 'title' | 'description' | 'checked'> & {column: Column};
export type CreateCardResponse = Omit<Card, 'commentsIds'> & {column: Column};

export type GetCardParams = {
  token: string;
  cardId: number;
};
export type GetCardResponse = Card;

export type UpdateCardParams = {
  token: string;
  cardId: number;
} & Pick<Card, 'title' | 'description' | 'checked'> & {column: Column};
export type UpdateCardResponse = Omit<Card, 'columnId'>;

export type DeleteCardParams = {
  token: string;
  cardId: number;
};
export type DeleteCardResponse = {cardId: number};
