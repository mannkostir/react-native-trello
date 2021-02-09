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
    ) {
      state.isLoading = true;
    },
    getAllCardsSucceeded(state, action: PayloadAction<GetAllCardsResponse>) {
      state.currentCards = action.payload;
      state.isLoading = false;
    },
    getAllCardsFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [CardsPublicActions.CREATE_CARD](
      state,
      action: PayloadAction<CreateCardParams>,
    ) {
      state.isLoading = true;
    },
    createCardSucceeded(state, action: PayloadAction<CreateCardResponse>) {
      const {column, ...cardData} = action.payload;
      state.currentCards.push({...cardData, commentsIds: []});
      state.isLoading = false;
    },
    createCardFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [CardsPublicActions.GET_CARD](state, action: PayloadAction<GetCardParams>) {
      state.isLoading = true;
    },
    getCardSucceeded(state, action: PayloadAction<GetCardResponse>) {
      state.currentCards.length = 0;
      state.currentCards.push(action.payload);
      state.isLoading = false;
    },
    getCardFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [CardsPublicActions.UPDATE_CARD](
      state,
      action: PayloadAction<UpdateCardParams>,
    ) {
      state.isLoading = true;
    },
    updateCardSucceeded(state, action: PayloadAction<UpdateCardResponse>) {
      const targetCardIndex = state.currentCards.findIndex(
        (card) => card.id === action.payload.id,
      );

      state.currentCards[targetCardIndex] = {
        ...state.currentCards[targetCardIndex],
        ...action.payload,
      };

      state.isLoading = false;
    },
    updateCardFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [CardsPublicActions.DELETE_CARD](
      state,
      action: PayloadAction<DeleteCardParams>,
    ) {
      state.isLoading = true;
    },
    deleteCardSucceeded(state, action: PayloadAction<DeleteCardResponse>) {
      const targetCardIndex = state.currentCards.findIndex(
        (card) => card.id === action.payload.cardId,
      );

      state.currentCards.splice(targetCardIndex, 1);

      state.isLoading = false;
    },
    deleteCardFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const cardsActions = cardsSlice.actions;
export default cardsSlice.reducer;
