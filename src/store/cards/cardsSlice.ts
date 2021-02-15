import {CardsState} from '@/types/storeTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cardsActions} from '.';
import {
  CreateCardResponse,
  DeleteCardResponse,
  GetAllCardsResponse,
  GetCardResponse,
  UpdateCardResponse,
} from './cardsTypes';

export const defaultCards: CardsState = {
  currentCards: [],
  selectedCard: null,
  isLoading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: defaultCards,
  reducers: {
    getAllCardsSucceeded(state, action: PayloadAction<GetAllCardsResponse>) {
      state.currentCards = action.payload;
      state.isLoading = false;
    },
    getAllCardsFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    createCardSucceeded(state, action: PayloadAction<CreateCardResponse>) {
      const {column, ...cardData} = action.payload;
      state.currentCards.unshift({...cardData, commentsIds: []});
      state.isLoading = false;
    },
    createCardFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    getCardSucceeded(state, action: PayloadAction<GetCardResponse>) {
      state.selectedCard = action.payload;
      state.isLoading = false;
    },
    getCardFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
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
    deleteCardSucceeded(state, action: PayloadAction<DeleteCardResponse>) {
      const targetCardIndex = state.currentCards.findIndex(
        (card) => card.id === action.payload.cardId,
      );

      console.log(state.currentCards[targetCardIndex].title);

      state.currentCards.splice(targetCardIndex, 1);

      state.isLoading = false;
    },
    deleteCardFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;

      console.log(action.payload.message);

      state.isLoading = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(cardsActions.getAllCards, (state) => {
        state.isLoading = true;
      })
      .addCase(cardsActions.createCard, (state) => {
        // state.isLoading = true;
      })
      .addCase(cardsActions.getCard, (state) => {
        // state.isLoading = true;
      })
      .addCase(cardsActions.updateCard, (state) => {
        // state.isLoading = true;
      })
      .addCase(cardsActions.deleteCard, (state) => {
        // state.isLoading = true;
      }),
});

export const cardsInternalActions = cardsSlice.actions;
export default cardsSlice.reducer;
