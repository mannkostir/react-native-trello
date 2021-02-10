import commentsService from '@/services/commentsService';
import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  CreateCommentParams,
  DeleteCommentParams,
  GetAllCommentsParams,
  GetCommentParams,
  UpdateCommentParams,
} from './comments.types';
import {commentsInternalActions, CommentsPublicActions} from './commentsSlice';

function* getAllCommentsWorker(action: PayloadAction<GetAllCommentsParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof commentsService.getAllComments>
    > = yield call(commentsService.getAllComments, action.payload);

    yield put(commentsInternalActions.getAllCommentsSucceeded(data));
  } catch (e) {
    yield put(
      commentsInternalActions.getAllCommentsFailed({message: e.message}),
    );
  }
}

function* createCommentWorker(action: PayloadAction<CreateCommentParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof commentsService.createComment>
    > = yield call(commentsService.createComment, action.payload);

    yield put(commentsInternalActions.createCommentSucceeded(data));
  } catch (e) {
    yield put(
      commentsInternalActions.createCommentFailed({message: e.message}),
    );
  }
}

function* getCommentWorker(action: PayloadAction<GetCommentParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof commentsService.getComment>
    > = yield call(commentsService.getComment, action.payload);

    yield put(commentsInternalActions.getCommentSucceeded(data));
  } catch (e) {
    yield put(commentsInternalActions.getCommentFailed({message: e.message}));
  }
}

function* updateCommentWorker(action: PayloadAction<UpdateCommentParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof commentsService.updateComment>
    > = yield call(commentsService.updateComment, action.payload);

    yield put(commentsInternalActions.updateCommentSucceeded(data));
  } catch (e) {
    yield put(
      commentsInternalActions.updateCommentFailed({message: e.message}),
    );
  }
}

function* deleteCommentWorker(action: PayloadAction<DeleteCommentParams>) {
  try {
    const data: Unpromise<
      ReturnType<typeof commentsService.deleteComment>
    > = yield call(commentsService.deleteComment, action.payload);

    yield put(commentsInternalActions.deleteCommentSucceeded(data));
  } catch (e) {
    yield put(
      commentsInternalActions.deleteCommentFailed({message: e.message}),
    );
  }
}

export default function* commentsWatcher() {
  yield takeEvery(CommentsPublicActions.GET_ALL_COMMENTS, getAllCommentsWorker);
  yield takeEvery(CommentsPublicActions.CREATE_COMMENT, createCommentWorker);
  yield takeEvery(CommentsPublicActions.GET_COMMENT, getCommentWorker);
  yield takeEvery(CommentsPublicActions.UPDATE_COMMENT, updateCommentWorker);
  yield takeEvery(CommentsPublicActions.DELETE_COMMENT, deleteCommentWorker);
}
