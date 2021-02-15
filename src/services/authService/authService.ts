import fetchAPI from '@/services';
import {
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
} from '@/store/auth/authTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE} from '@env';

export const signIn = async (params: SignInParams) => {
  try {
    const data = await fetchAPI<SignInResponse>(`${API_BASE}/auth/sign-in`, {
      method: 'POST',
      rawBody: params,
    });

    await AsyncStorage.setItem('@token', data.token);

    return data;
  } catch (e) {
    throw e;
  }
};

export const signUp = async (params: SignUpParams) => {
  const data = await fetchAPI<SignUpResponse>(`${API_BASE}/auth/sign-up`, {
    method: 'POST',
    rawBody: params,
  });

  return data;
};
