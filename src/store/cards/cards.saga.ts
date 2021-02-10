import cardsService from '@/services/cardsService';
import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  CreateCardParams,
  DeleteCardParams,
  GetAllCardsParams,
  GetCardParams,
  UpdateCardParams,
} from './cards.types';
import {cardsInternalActions, CardsPublicActions} from './cardsSlice';

function* getAllCardsWorker(action: PayloadAction<GetAllCardsParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof cardsService.getAllCards>
    > = yield call(cardsService.getAllCards, action.payload);

    yield put(cardsInternalActions.getAllCardsSucceeded(data));
  } catch (e) {
    yield put(cardsInternalActions.getAllCardsFailed({message: e.message}));
  }
}

function* createCardWorker(action: PayloadAction<CreateCardParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof cardsService.createCard>
    > = yield call(cardsService.createCard, action.payload);

    yield put(cardsInternalActions.createCardSucceeded(data));
  } catch (e) {
    yield put(cardsInternalActions.createCardFailed({message: e.message}));
  }
}

function* getCardWorker(action: PayloadAction<GetCardParams>) {
  try {
    const data: Unpromise<ReturnType<typeof cardsService.getCard>> = yield call(
      cardsService.getCard,
      action.payload,
    );

    yield put(cardsInternalActions.getCardSucceeded(data));
  } catch (e) {
    yield put(cardsInternalActions.getCardFailed({message: e.message}));
  }
}

function* updateCardWorker(action: PayloadAction<UpdateCardParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof cardsService.updateCard>
    > = yield call(cardsService.updateCard, action.payload);

    yield put(cardsInternalActions.updateCardSucceeded(data));
  } catch (e) {
    yield put(cardsInternalActions.updateCardFailed({message: e.message}));
  }
}

function* deleteCardWorker(action: PayloadAction<DeleteCardParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof cardsService.deleteCard>
    > = yield call(cardsService.deleteCard, action.payload);

    yield put(cardsInternalActions.deleteCardSucceeded(data));
  } catch (e) {
    yield put(cardsInternalActions.deleteCardFailed({message: e.message}));
  }
}

export default function* cardsWatcher() {
  yield takeEvery(CardsPublicActions.GET_ALL_CARDS, getAllCardsWorker);
  yield takeEvery(CardsPublicActions.CREATE_CARD, createCardWorker);
  yield takeEvery(CardsPublicActions.GET_CARD, getCardWorker);
  yield takeEvery(CardsPublicActions.UPDATE_CARD, updateCardWorker);
  yield takeEvery(CardsPublicActions.DELETE_CARD, deleteCardWorker);
}
