import {createAction} from '@reduxjs/toolkit';
import {
  CreateColumnParams,
  DeleteColumnParams,
  GetAllColumnsParams,
  GetColumnParams,
  UpdateColumnParams,
} from './columns.types';

enum ColumnsPublicActions {
  GET_ALL_COLUMNS = 'getAllColumnsRequested',
  GET_COLUMN = 'getColumnRequested',
  CREATE_COLUMN = 'createColumnRequested',
  UPDATE_COLUMN = 'updateColumnRequested',
  DELETE_COLUMN = 'deleteColumnRequested',
}

export const getAllColumns = createAction<GetAllColumnsParams>(
  ColumnsPublicActions.GET_ALL_COLUMNS,
);
export const getColumn = createAction<GetColumnParams>(
  ColumnsPublicActions.GET_COLUMN,
);
export const createColumn = createAction<CreateColumnParams>(
  ColumnsPublicActions.CREATE_COLUMN,
);
export const updateColumn = createAction<UpdateColumnParams>(
  ColumnsPublicActions.UPDATE_COLUMN,
);
export const deleteColumn = createAction<DeleteColumnParams>(
  ColumnsPublicActions.DELETE_COLUMN,
);
