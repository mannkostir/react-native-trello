import {AuthState} from '@/types/Store.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  SignInParams,
  SignUpParams,
  SignUpResponse,
  SignInResponse,
} from './auth.types';

export const defaultAuth: AuthState = {
  userId: null,
  username: null,
  error: null,
  token: null,
  isLoading: false,
};

export enum AuthPublicActions {
  SIGN_IN = 'signInRequested',
  SIGN_UP = 'signUpRequested',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuth,
  reducers: {
    [AuthPublicActions.SIGN_IN](state, action: PayloadAction<SignInParams>) {
      state.isLoading = true;
    },
    signInSucceeded(state, action: PayloadAction<SignInResponse>) {
      state.userId = action.payload.id;
      state.username = action.payload.name;
      state.error = null;
      state.isLoading = false;
    },
    signInFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [AuthPublicActions.SIGN_UP](state, action: PayloadAction<SignUpParams>) {
      state.isLoading = true;
    },
    signUpSucceeded(state, action: PayloadAction<SignUpResponse>) {},
    signUpFailed(state, action: PayloadAction<{message: string}>) {},
    signOut() {
      return defaultAuth;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
