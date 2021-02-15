import {createAction} from '@reduxjs/toolkit';
import {
  CreateCardParams,
  DeleteCardParams,
  GetCardParams,
  UpdateCardParams,
} from './cardsTypes';

enum CardsPublicActions {
  GET_ALL_CARDS = 'getAllCardsRequested',
  CREATE_CARD = 'createCardRequested',
  GET_CARD = 'getCardRequested',
  UPDATE_CARD = 'updateCardRequested',
  DELETE_CARD = 'deleteCardRequested',
}

export const getAllCards = createAction(CardsPublicActions.GET_ALL_CARDS);
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
