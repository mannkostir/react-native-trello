import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  CreateCardParams,
  CreateCardResponse,
  DeleteCardParams,
  DeleteCardResponse,
  GetAllCardsParams,
  GetAllCardsResponse,
  GetCardParams,
  GetCardResponse,
  UpdateCardParams,
  UpdateCardResponse,
} from './cards.types';

export const defaultCards = {
  currentCards: [],
  isLoading: false,
  error: null,
};

export enum CardsPublicActions {
  GET_ALL_CARDS = 'getAllCardsRequested',
  CREATE_CARD = 'createCardRequested',
  GET_CARD = 'getCardRequested',
  UPDATE_CARD = 'updateCardRequested',
  DELETE_CARD = 'deleteCardRequested',
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: defaultCards,
  reducers: {
    [CardsPublicActions.GET_ALL_CARDS](
      state,
      action: PayloadAction<GetAllCardsParams>,
    ) {},
    getAllCardsSucceeded(state, action: PayloadAction<GetAllCardsResponse>) {},
    getAllCardsFailed(state, action: PayloadAction<{message: string}>) {},
    [CardsPublicActions.CREATE_CARD](
      state,
      action: PayloadAction<CreateCardParams>,
    ) {},
    createCardSucceeded(state, action: PayloadAction<CreateCardResponse>) {},
    createCardFailed(state, action: PayloadAction<{message: string}>) {},
    [CardsPublicActions.GET_CARD](
      state,
      action: PayloadAction<GetCardParams>,
    ) {},
    getCardSucceeded(state, action: PayloadAction<GetCardResponse>) {},
    getCardFailed(state, action: PayloadAction<{message: string}>) {},
    [CardsPublicActions.UPDATE_CARD](
      state,
      action: PayloadAction<UpdateCardParams>,
    ) {},
    updateCardSucceeded(state, action: PayloadAction<UpdateCardResponse>) {},
    updateCardFailed(state, action: PayloadAction<{message: string}>) {},
    [CardsPublicActions.DELETE_CARD](
      state,
      action: PayloadAction<DeleteCardParams>,
    ) {},
    deleteCardSucceeded(state, action: PayloadAction<DeleteCardResponse>) {},
    deleteCardFailed(state, action: PayloadAction<{message: string}>) {},
  },
});

export const cardsActions = cardsSlice.actions;
export default cardsSlice.reducer;
