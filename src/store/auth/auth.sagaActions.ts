import {createAction} from '@reduxjs/toolkit';
import {SignInParams, SignUpParams} from './auth.types';

enum AuthPublicActions {
  SIGN_IN = 'signInRequested',
  SIGN_UP = 'signUpRequested',
}

export const signIn = createAction<SignInParams>(AuthPublicActions.SIGN_IN);
export const signUp = createAction<SignUpParams>(AuthPublicActions.SIGN_UP);
