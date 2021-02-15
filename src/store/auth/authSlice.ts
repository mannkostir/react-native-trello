import {AuthState} from '@/types/storeTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authActions} from '.';
import {SignUpResponse, SignInResponse} from './authTypes';

export const defaultAuth: AuthState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuth,
  reducers: {
    signInSucceeded(state, action: PayloadAction<SignInResponse>) {
      const user: typeof state.currentUser = {
        email: action.payload.email,
        id: action.payload.id,
        token: action.payload.token,
        name: action.payload.name,
      };
      state.currentUser = user;
      state.error = null;
      state.isLoading = false;
      console.log(action.payload.name);
    },
    signInFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
      console.error(action.payload.message);
    },
    signUpSucceeded(state, action: PayloadAction<SignUpResponse>) {
      state.isLoading = false;
      console.log(action.payload.name);
    },
    signUpFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
      console.error(action.payload.message);
    },
    signOut() {
      return defaultAuth;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(authActions.signIn, (state) => {
        state.isLoading = true;
      })
      .addCase(authActions.signUp, (state) => {
        state.isLoading = true;
      }),
});

export const authInternalActions = authSlice.actions;
export default authSlice.reducer;
