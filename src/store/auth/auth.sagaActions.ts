import {createAction} from '@reduxjs/toolkit';
import {SignInParams, SignUpParams} from './auth.types';
import {AuthPublicActions} from './authSlice';

export const signIn = createAction<SignInParams>(AuthPublicActions.SIGN_IN);
export const signUp = createAction<SignUpParams>(AuthPublicActions.SIGN_UP);
