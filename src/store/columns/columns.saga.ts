import columnsService from '@/services/columnsService';
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
    const data: Unpromise<
      ReturnType<typeof columnsService.getAllColumns>
    > = yield call(columnsService.getAllColumns, action.payload);

    yield put(columnsActions.getAllColumnsSucceeded(data));
  } catch (e) {
    yield put(columnsActions.getAllColumnsFailed({message: e.message}));
  }
}

function* getColumnWorker(action: PayloadAction<GetColumnParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.getColumn>
    > = yield call(columnsService.getColumn, action.payload);

    yield put(columnsActions.getColumnSucceeded(data));
  } catch (e) {
    yield put(columnsActions.getColumnFailed({message: e.message}));
  }
}

function* createColumnWorker(action: PayloadAction<CreateColumnParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.createColumn>
    > = yield call(columnsService.createColumn, action.payload);

    yield put(columnsActions.createColumnSucceeded(data));
  } catch (e) {
    yield put(columnsActions.createColumnFailed({message: e.message}));
  }
}

function* updateColumnWorker(action: PayloadAction<UpdateColumnParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.updateColumn>
    > = yield call(columnsService.updateColumn, action.payload);

    yield put(columnsActions.updateColumnSucceeded(data));
  } catch (e) {
    yield put(columnsActions.updateColumnFailed({message: e.message}));
  }
}

function* deleteColumnWorker(action: PayloadAction<DeleteColumnParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof columnsService.deleteColumn>
    > = yield call(columnsService.deleteColumn, action.payload);

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
