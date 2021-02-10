import {AuthToken, Column} from '@/types/Common.types';

export type GetAllColumnsParams = {
  token: AuthToken;
};
export type GetAllColumnsResponse = Column[];

export type CreateColumnParams = {
  columnData: {
    title: string;
    description: string;
  };
  token: AuthToken;
};
export type CreateColumnResponse = {
  title: string;
  description: string;
  user: number;
  id: number;
};

export type GetColumnParams = {
  token: AuthToken;
  listId: number;
};
export type GetColumnResponse = Column;

export type UpdateColumnParams = {
  columnData: {
    title: string;
  };
  token: AuthToken;
  listId: number;
};
export type UpdateColumnResponse = Column;

export type DeleteColumnParams = {
  token: AuthToken;
  listId: number;
};
export type DeleteColumnResponse = {
  listId: number;
};
