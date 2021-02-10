import {AuthToken, Card, Column} from '@/types/Common.types';

export type GetAllCardsParams = {
  token: AuthToken;
};
export type GetAllCardsResponse = Card[];

export type CreateCardParams = {
  cardData: Pick<Card, 'title' | 'description' | 'checked'>;
  columnId: number;
  token: AuthToken;
};
export type CreateCardResponse = Omit<Card, 'commentsIds'> & {column: Column};

export type GetCardParams = {
  token: AuthToken;
  cardId: number;
};
export type GetCardResponse = Card;

export type UpdateCardParams = {
  token: AuthToken;
  cardId: number;
  cardData: Pick<Card, 'title' | 'description' | 'checked'>;
} & {column: Column | null};
export type UpdateCardResponse = Omit<Card, 'columnId'>;

export type DeleteCardParams = {
  token: AuthToken;
  cardId: number;
};
export type DeleteCardResponse = {cardId: number};
