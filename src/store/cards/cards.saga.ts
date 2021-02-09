import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
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
import {cardsActions, CardsPublicActions} from './cardsSlice';

function* getAllCardsWorker(action: PayloadAction<GetAllCardsParams>) {
  try {
    const sendRequest = async ({token}: typeof action.payload) => {
      const res = await fetch('http://trello-purrweb.herokuapp.com/cards', {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result: GetAllCardsResponse = await res.json();

      return result;
    };

    const data: Unpromise<
      ReturnType<typeof sendRequest>
    > = yield call(sendRequest, {token: action.payload.token});

    yield put(cardsActions.getAllCardsSucceeded(data));
  } catch (e) {
    yield put(cardsActions.getAllCardsFailed({message: e.message}));
  }
}

function* createCardWorker(action: PayloadAction<CreateCardParams>) {
  try {
    const sendRequest = async (requestData: typeof action.payload) => {
      const {token, ...cardData} = requestData;

      const res = await fetch('http://trello-purrweb.herokuapp.com/cards', {
        body: JSON.stringify(cardData),
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result: CreateCardResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(cardsActions.createCardSucceeded(data));
  } catch (e) {
    yield put(cardsActions.createCardFailed({message: e.message}));
  }
}

function* getCardWorker(action: PayloadAction<GetCardParams>) {
  try {
    const sendRequest = async ({token, cardId}: typeof action.payload) => {
      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/cards/${cardId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const result: GetCardResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(cardsActions.getCardSucceeded(data));
  } catch (e) {
    yield put(cardsActions.getCardFailed({message: e.message}));
  }
}

function* updateCardWorker(action: PayloadAction<UpdateCardParams>) {
  try {
    const sendRequest = async (requestData: typeof action.payload) => {
      const {token, cardId, ...cardData} = requestData;

      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/cards/${cardId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(cardData),
        },
      );

      const result: UpdateCardResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(cardsActions.updateCardSucceeded(data));
  } catch (e) {
    yield put(cardsActions.updateCardFailed({message: e.message}));
  }
}

function* deleteCardWorker(action: PayloadAction<DeleteCardParams>) {
  try {
    const sendRequest = async ({
      token,
      cardId,
    }: typeof action.payload): Promise<DeleteCardResponse> => {
      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/cards/${cardId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
          method: 'DELETE',
        },
      );

      const result = await res.json();

      return {cardId: action.payload.cardId, ...result};
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(cardsActions.deleteCardSucceeded(data));
  } catch (e) {
    yield put(cardsActions.deleteCardFailed({message: e.message}));
  }
}

export default function* cardsWatcher() {
  yield takeEvery(CardsPublicActions.GET_ALL_CARDS, getAllCardsWorker);
  yield takeEvery(CardsPublicActions.CREATE_CARD, createCardWorker);
  yield takeEvery(CardsPublicActions.GET_CARD, getCardWorker);
  yield takeEvery(CardsPublicActions.UPDATE_CARD, updateCardWorker);
  yield takeEvery(CardsPublicActions.DELETE_CARD, deleteCardWorker);
}
