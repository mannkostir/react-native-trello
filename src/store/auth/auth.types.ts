import {Column, User} from '@/types/Common.types';

export type SignInParams = {
  email: string;
  password: string;
};
export type SignInResponse = User;

export type SignUpParams = {
  email: string;
  name: string;
  password: string;
};
export type SignUpResponse = User & {
  columns: Pick<Column, 'title' | 'id'>[];
};
