import {all} from 'redux-saga/effects';
import authSaga from './auth/auth.saga';
import cardsSaga from './cards/cards.saga';
import columnsSaga from './columns/columns.saga';
import commentsSaga from './comments/comments.saga';

export default function* rootSaga() {
  yield all([authSaga(), cardsSaga(), columnsSaga(), commentsSaga()]);
}
