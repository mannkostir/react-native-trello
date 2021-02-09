import fetchAPI from '@/services';
import {
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
} from '@/store/auth/auth.types';

export const signIn = async (params: SignInParams) => {
  const data = await fetchAPI<SignInResponse>(
    'http://trello-purrweb.herokuapp.com/auth/sign-in',
    {method: 'POST', rawBody: params},
  );

  return data;
};

export const signUp = async (params: SignUpParams) => {
  const data = await fetchAPI<SignUpResponse>(
    'http://trello-purrweb.herokuapp.com/auth/sign-up',
    {method: 'POST', rawBody: params},
  );

  return data;
};
