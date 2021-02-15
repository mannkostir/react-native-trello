import {Column} from '@/types/Common.types';

export type GetAllColumnsResponse = Column[];

export type CreateColumnParams = {
  columnData: {
    title: string;
    description: string;
  };
};
export type CreateColumnResponse = {
  title: string;
  description: string;
  user: number;
  id: number;
};

export type GetColumnParams = {
  listId: number;
};
export type GetColumnResponse = Column;

export type UpdateColumnParams = {
  columnData: {
    title: string;
  };
  listId: number;
};
export type UpdateColumnResponse = Column;

export type DeleteColumnParams = {
  listId: number;
};
export type DeleteColumnResponse = {
  listId: number;
};
