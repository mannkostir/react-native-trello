import {AuthState} from '@/types/Store.types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const defaultAuth: AuthState = {
  userId: null,
  username: null,
};

interface ISignInParams {
  email: string;
  password: string;
}
type SignInResponse = {
  id: string;
  email: string;
  name: string;
  token: string;
};

export const signIn = createAsyncThunk(
  'auth/sign-in',
  async ({email, password}: ISignInParams) => {
    const res = await fetch(
      'http://trello-purrweb.herokuapp.com/auth/sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const result: SignInResponse = await res.json();

    return result;
  },
);

interface ISignUpParams {
  email: string;
  name: string;
  password: string;
}
type SignUpResponse = {
  email: string;
  name: string;
  password: string;
  token: string;
  columns: {title: string; id: number}[];
};

export const signUp = createAsyncThunk(
  'auth/sign-up',
  async ({email, name, password}: ISignUpParams) => {
    const res = await fetch(
      'http://trello-purrweb.herokuapp.com/auth/sign-up',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      },
    );

    const result: SignUpResponse = await res.json();

    return result;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: defaultAuth,
  reducers: {
    signOut(state) {
      state = defaultAuth;
    },
  },
  extraReducers: (builder) => {},
});
