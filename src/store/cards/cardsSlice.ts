import {CardsState} from '@/types/Store.types';
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

export const defaultCards: CardsState = {
  currentCards: [
    {
      title: 'First Item',
      id: 1,
      columnId: 1,
      description: 'nope',
      checked: false,
      commentsIds: [],
    },
    {
      title: 'Second Item',
      id: 2,
      columnId: 2,
      description: 'nope',
      checked: false,
      commentsIds: [],
    },
    {
      title: 'Third Item',
      id: 3,
      columnId: 3,
      description: 'nope',
      checked: false,
      commentsIds: [],
    },
    {
      title: 'Fourth Item',
      id: 4,
      columnId: 4,
      description: 'nope',
      checked: false,
      commentsIds: [],
    },
    {
      title: 'Fifth Item',
      id: 5,
      columnId: 5,
      description: 'nope',
      checked: false,
      commentsIds: [],
    },
  ],
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
