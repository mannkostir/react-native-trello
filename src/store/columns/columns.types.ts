import {Column} from '@/types/Common.types';

export type GetAllColumnsParams = {
  token: string;
};
export type GetAllColumnsResponse = Column[];

export type CreateColumnParams = {
  token: string;
  title: string;
  description: string;
  listId: number;
};
export type CreateColumnResponse = {
  title: string;
  description: string;
  user: number;
  id: number;
};

export type GetColumnParams = {
  token: string;
  listId: number;
};
export type GetColumnResponse = Column;

export type UpdateColumnParams = {
  token: string;
  title: string;
  description: string;
  listId: number;
};
export type UpdateColumnResponse = Column;

export type DeleteColumnParams = {
  token: string;
  listId: number;
};
export type DeleteColumnResponse = {
  listId: number;
};
