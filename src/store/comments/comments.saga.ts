import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  CreateCommentParams,
  CreateCommentResponse,
  DeleteCommentParams,
  DeleteCommentResponse,
  GetAllCommentsParams,
  GetAllCommentsResponse,
  GetCommentParams,
  GetCommentResponse,
  UpdateCommentParams,
  UpdateCommentResponse,
} from './comments.types';
import {commentsActions, CommentsPublicActions} from './commentsSlice';

function* getAllCommentsWorker(action: PayloadAction<GetAllCommentsParams>) {
  try {
    const sendRequest = async ({token}: typeof action.payload) => {
      const res = await fetch(`http://trello-purrweb.herokuapp.com/comments`, {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result: GetAllCommentsResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(commentsActions.getAllCommentsSucceeded(data));
  } catch (e) {
    yield put(commentsActions.getAllCommentsFailed({message: e.message}));
  }
}

function* createCommentWorker(action: PayloadAction<CreateCommentParams>) {
  try {
    const sendRequest = async (requestData: typeof action.payload) => {
      const {token, ...commentData} = requestData;

      const res = await fetch(`http://trello-purrweb.herokuapp.com/comments`, {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(commentData),
      });

      const result: CreateCommentResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(commentsActions.createCommentSucceeded(data));
  } catch (e) {
    yield put(commentsActions.createCommentFailed({message: e.message}));
  }
}

function* getCommentWorker(action: PayloadAction<GetCommentParams>) {
  try {
    const sendRequest = async ({token, commentId}: typeof action.payload) => {
      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/comments/${commentId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const result: GetCommentResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(commentsActions.getCommentSucceeded(data));
  } catch (e) {
    yield put(commentsActions.getCommentFailed({message: e.message}));
  }
}

function* updateCommentWorker(action: PayloadAction<UpdateCommentParams>) {
  try {
    const sendRequest = async (requestData: typeof action.payload) => {
      const {commentId, token, ...commentData} = requestData;

      const res = await fetch(`http://trello-purrweb.herokuapp.com/comments`, {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(commentData),
      });

      const result: UpdateCommentResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(commentsActions.updateCommentSucceeded(data));
  } catch (e) {
    yield put(commentsActions.updateCommentFailed({message: e.message}));
  }
}

function* deleteCommentWorker(action: PayloadAction<DeleteCommentParams>) {
  try {
    const sendRequest = async ({token, commentId}: typeof action.payload) => {
      const res = await fetch(
        `http://trello-purrweb.herokuapp.com/comments/${commentId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        },
      );

      const result: DeleteCommentResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(commentsActions.deleteCommentSucceeded(data));
  } catch (e) {
    yield put(commentsActions.deleteCommentFailed({message: e.message}));
  }
}

export default function* commentsWatcher() {
  yield takeEvery(CommentsPublicActions.GET_ALL_COMMENTS, getAllCommentsWorker);
  yield takeEvery(CommentsPublicActions.CREATE_COMMENT, createCommentWorker);
  yield takeEvery(CommentsPublicActions.GET_COMMENT, getCommentWorker);
  yield takeEvery(CommentsPublicActions.UPDATE_COMMENT, updateCommentWorker);
  yield takeEvery(CommentsPublicActions.DELETE_COMMENT, deleteCommentWorker);
}
