import fetchAPI from '@/services';
import {
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
} from '@/store/auth/auth.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = async (params: SignInParams) => {
  try {
    const data = await fetchAPI<SignInResponse>(
      'http://trello-purrweb.herokuapp.com/auth/sign-in',
      {method: 'POST', rawBody: params},
    );

    await AsyncStorage.setItem('@token', data.token);

    return data;
  } catch (e) {
    throw e;
  }
};

export const signUp = async (params: SignUpParams) => {
  const data = await fetchAPI<SignUpResponse>(
    'http://trello-purrweb.herokuapp.com/auth/sign-up',
    {method: 'POST', rawBody: params},
  );

  return data;
};
