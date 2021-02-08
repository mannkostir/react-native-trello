import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  CreateColumnParams,
  CreateColumnResponse,
  DeleteColumnParams,
  DeleteColumnResponse,
  GetAllColumnsParams,
  GetAllColumnsResponse,
  GetColumnParams,
  GetColumnResponse,
  UpdateColumnParams,
  UpdateColumnResponse,
} from './columns.types';
import {columnsActions, ColumnsPublicActions} from './columnsSlice';

function* getAllColumnsWorker(action: PayloadAction<GetAllColumnsParams>) {
  try {
    const sendRequest = async ({token}: typeof action.payload) => {
      const res = await fetch('http://trello-purrweb.herokuapp.com/columns', {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result: GetAllColumnsResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(columnsActions.getAllColumnsSucceeded(data));
  } catch (e) {
    yield put(columnsActions.getAllColumnsFailed({message: e.message}));
  }
}

function* getColumnWorker(action: PayloadAction<GetColumnParams>) {
  try {
    const sendRequest = async ({token, listId}: typeof action.payload) => {
      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/columns/${listId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const result: GetColumnResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      {
        listId: action.payload.listId,
        token: action.payload.token,
      },
    );

    yield put(columnsActions.getColumnSucceeded(data));
  } catch (e) {
    yield put(columnsActions.getColumnFailed({message: e.message}));
  }
}

function* createColumnWorker(action: PayloadAction<CreateColumnParams>) {
  try {
    const sendRequest = async (requestData: typeof action.payload) => {
      const {token, listId, ...columnData} = requestData;
      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/columns/${listId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(columnData),
        },
      );

      const result: CreateColumnResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(columnsActions.createColumnSucceeded(data));
  } catch (e) {
    yield put(columnsActions.createColumnFailed({message: e.message}));
  }
}

function* updateColumnWorker(action: PayloadAction<UpdateColumnParams>) {
  try {
    const sendRequest = async (requestData: typeof action.payload) => {
      const {token, listId, ...columnData} = requestData;
      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/columns/${listId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(columnData),
        },
      );

      const result: UpdateColumnResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(columnsActions.updateColumnSucceeded(data));
  } catch (e) {
    yield put(columnsActions.updateColumnFailed({message: e.message}));
  }
}

function* deleteColumnWorker(action: PayloadAction<DeleteColumnParams>) {
  try {
    const sendRequest = async ({listId, token}: typeof action.payload) => {
      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/columns/${listId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        },
      );

      const result: DeleteColumnResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(columnsActions.deleteColumnSucceeded(data));
  } catch (e) {
    yield put(columnsActions.deleteColumnFailed({message: e.message}));
  }
}

export default function* columnsWatcher() {
  yield takeEvery(ColumnsPublicActions.GET_ALL_COLUMNS, getAllColumnsWorker);
  yield takeEvery(ColumnsPublicActions.CREATE_COLUMN, createColumnWorker);
  yield takeEvery(ColumnsPublicActions.GET_COLUMN, getColumnWorker);
  yield takeEvery(ColumnsPublicActions.UPDATE_COLUMN, updateColumnWorker);
  yield takeEvery(ColumnsPublicActions.DELETE_COLUMN, deleteColumnWorker);
}
