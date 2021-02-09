import {Column} from '@/types/Common.types';

export type GetAllColumnsParams = {
  token: string;
};
export type GetAllColumnsResponse = Column[];

export type CreateColumnParams = {
  columnData: {
    title: string;
    description: string;
  };
  token: string;
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
  columnData: {
    title: string;
    description: string;
  };
  token: string;
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
