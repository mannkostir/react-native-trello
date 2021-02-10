import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {authInternalActions, AuthPublicActions} from './authSlice';
import {SignInParams, SignUpParams} from './auth.types';
import authService from '@/services/authService';

function* signInWorker(action: PayloadAction<SignInParams>) {
  try {
    const data: Unpromise<ReturnType<typeof authService.signIn>> = yield call(
      authService.signIn,
      action.payload,
    );
    yield put(authInternalActions.signInSucceeded(data));
  } catch (e) {
    yield put(authInternalActions.signInFailed({message: e.message}));
  }
}

function* signUpWorker(action: PayloadAction<SignUpParams>) {
  try {
    const data: Unpromise<ReturnType<typeof authService.signUp>> = yield call(
      authService.signUp,
      action.payload,
    );

    yield put(authInternalActions.signUpSucceeded(data));
  } catch (e) {
    yield put(authInternalActions.signUpFailed({message: e.message}));
  }
}

export default function* authWatcher() {
  yield takeEvery(AuthPublicActions.SIGN_IN, signInWorker);
  yield takeEvery(AuthPublicActions.SIGN_UP, signUpWorker);
}
