import {createAction} from '@reduxjs/toolkit';
import {
  CreateCardParams,
  DeleteCardParams,
  GetAllCardsParams,
  GetCardParams,
  UpdateCardParams,
} from './cards.types';

enum CardsPublicActions {
  GET_ALL_CARDS = 'getAllCardsRequested',
  CREATE_CARD = 'createCardRequested',
  GET_CARD = 'getCardRequested',
  UPDATE_CARD = 'updateCardRequested',
  DELETE_CARD = 'deleteCardRequested',
}

export const getAllCards = createAction<GetAllCardsParams>(
  CardsPublicActions.GET_ALL_CARDS,
);
export const createCard = createAction<CreateCardParams>(
  CardsPublicActions.CREATE_CARD,
);
export const getCard = createAction<GetCardParams>(CardsPublicActions.GET_CARD);
export const updateCard = createAction<UpdateCardParams>(
  CardsPublicActions.UPDATE_CARD,
);
export const deleteCard = createAction<DeleteCardParams>(
  CardsPublicActions.DELETE_CARD,
);
