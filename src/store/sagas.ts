import {all} from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import cardsSaga from './cards/cardsSaga';
import columnsSaga from './columns/columnsSaga';
import commentsSaga from './comments/commentsSaga';

export default function* rootSaga() {
  yield all([authSaga(), cardsSaga(), columnsSaga(), commentsSaga()]);
}
