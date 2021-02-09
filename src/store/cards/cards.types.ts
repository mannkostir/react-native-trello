import {Card, Column} from '@/types/Common.types';

export type GetAllCardsParams = {
  token: string;
};
export type GetAllCardsResponse = Card[];

export type CreateCardParams = {
  cardData: Pick<Card, 'title' | 'description' | 'checked' | 'columnId'>;
  token: string;
};
export type CreateCardResponse = Omit<Card, 'commentsIds'> & {column: Column};

export type GetCardParams = {
  token: string;
  cardId: number;
};
export type GetCardResponse = Card;

export type UpdateCardParams = {
  token: string;
  cardId: number;
  cardData: Pick<Card, 'title' | 'description' | 'checked'>;
} & {column: Column};
export type UpdateCardResponse = Omit<Card, 'columnId'>;

export type DeleteCardParams = {
  token: string;
  cardId: number;
};
export type DeleteCardResponse = {cardId: number};
