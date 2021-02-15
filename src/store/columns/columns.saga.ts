import columnsService from '@/services/columnsService';
import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {columnsActions} from '.';
import {
  CreateColumnParams,
  DeleteColumnParams,
  GetColumnParams,
  UpdateColumnParams,
} from './columns.types';
import {columnsInternalActions} from './columnsSlice';

function* getAllColumnsWorker() {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.getAllColumns>
    > = yield call(columnsService.getAllColumns);

    yield put(columnsInternalActions.getAllColumnsSucceeded(data));
  } catch (e) {
    yield put(columnsInternalActions.getAllColumnsFailed({message: e.message}));
  }
}

function* getColumnWorker(action: PayloadAction<GetColumnParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.getColumn>
    > = yield call(columnsService.getColumn, action.payload);

    yield put(columnsInternalActions.getColumnSucceeded(data));
  } catch (e) {
    yield put(columnsInternalActions.getColumnFailed({message: e.message}));
  }
}

function* createColumnWorker(action: PayloadAction<CreateColumnParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.createColumn>
    > = yield call(columnsService.createColumn, action.payload);

    yield put(columnsInternalActions.createColumnSucceeded(data));
  } catch (e) {
    yield put(columnsInternalActions.createColumnFailed({message: e.message}));
  }
}

function* updateColumnWorker(action: PayloadAction<UpdateColumnParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.updateColumn>
    > = yield call(columnsService.updateColumn, action.payload);

    yield put(columnsInternalActions.updateColumnSucceeded(data));
  } catch (e) {
    yield put(columnsInternalActions.updateColumnFailed({message: e.message}));
  }
}

function* deleteColumnWorker(action: PayloadAction<DeleteColumnParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.deleteColumn>
    > = yield call(columnsService.deleteColumn, action.payload);

    yield put(columnsInternalActions.deleteColumnSucceeded(data));
  } catch (e) {
    yield put(columnsInternalActions.deleteColumnFailed({message: e.message}));
  }
}

export default function* columnsWatcher() {
  yield takeEvery(columnsActions.getAllColumns, getAllColumnsWorker);
  yield takeEvery(columnsActions.createColumn, createColumnWorker);
  yield takeEvery(columnsActions.getColumn, getColumnWorker);
  yield takeEvery(columnsActions.updateColumn, updateColumnWorker);
  yield takeEvery(columnsActions.deleteColumn, deleteColumnWorker);
}
