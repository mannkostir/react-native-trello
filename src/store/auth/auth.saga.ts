import {Unpromise} from '@/types/Common.types';
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeEvery} from 'redux-saga/effects';
import {authInternalActions} from './authSlice';
import {SignInParams, SignUpParams} from './auth.types';
import authService from '@/services/authService';
import {authActions} from '.';

function* signInWorker(action: PayloadAction<SignInParams>) {
  try {
    const data: Unpromise<ReturnType<typeof authService.signIn>> & {
      message?: string;
    } = yield call(authService.signIn, action.payload);

    if (data.name === 'QueryFailedError' || data.name === 'EntityNotFound') {
      throw new Error(data.message);
    }

    yield put(authInternalActions.signInSucceeded(data));
  } catch (e) {
    console.log(e);
    yield put(authInternalActions.signInFailed({message: e.message}));
  }
}

function* signUpWorker(action: PayloadAction<SignUpParams>) {
  try {
    const data: Unpromise<ReturnType<typeof authService.signUp>> & {
      message?: string;
    } = yield call(authService.signUp, action.payload);

    if (data.name === 'QueryFailedError' || data.name === 'EntityNotFound') {
      throw new Error(data.message);
    }

    yield put(authInternalActions.signUpSucceeded(data));
  } catch (e) {
    yield put(authInternalActions.signUpFailed({message: e.message}));
  }
}

export default function* authWatcher() {
  yield takeEvery(authActions.signIn, signInWorker);
  yield takeEvery(authActions.signUp, signUpWorker);
}
