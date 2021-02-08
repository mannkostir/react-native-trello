import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {authActions, AuthPublicActions} from './authSlice';
import {
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
} from './auth.types';

function* signInWorker(action: PayloadAction<SignInParams>) {
  try {
    const sendRequest = async ({email, password}: SignInParams) => {
      const res = await fetch(
        'http://trello-purrweb.herokuapp.com/auth/sign-in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        },
      );

      const result: SignInResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );
    yield put(authActions.signInSucceeded(data));
  } catch (e) {
    yield put(authActions.signInFailed({message: e.message}));
  }
}

function* signUpWorker(action: PayloadAction<SignUpParams>) {
  try {
    const sendRequest = async ({email, name, password}: SignUpParams) => {
      const res = await fetch(
        'http://trello-purrweb.herokuapp.com/auth/sign-up',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, name, password}),
        },
      );

      const result: SignUpResponse = await res.json();

      return result;
    };

    const data: Unpromise<ReturnType<typeof sendRequest>> = yield call(
      sendRequest,
      action.payload,
    );

    yield put(authActions.signUpSucceeded(data));
  } catch (e) {
    yield put(authActions.signUpFailed({message: e.message}));
  }
}

export default function* authWatcher() {
  yield takeEvery(AuthPublicActions.SIGN_IN, signInWorker);
  yield takeEvery(AuthPublicActions.SIGN_UP, signUpWorker);
}
