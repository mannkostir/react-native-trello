import {Card, Column} from '@/types/Common.types';

export type GetAllCardsResponse = Card[];

export type CreateCardParams = {
  cardData: Pick<Card, 'title' | 'description' | 'checked'>;
  columnId: number;
};
export type CreateCardResponse = Omit<Card, 'commentsIds'> & {column: Column};

export type GetCardParams = {
  cardId: number;
};
export type GetCardResponse = Card;

export type UpdateCardParams = {
  cardId: number;
  cardData: Pick<Card, 'title' | 'description' | 'checked'>;
} & {column: Column | null};
export type UpdateCardResponse = Omit<Card, 'columnId'>;

export type DeleteCardParams = {
  cardId: number;
};
export type DeleteCardResponse = {cardId: number};
