import {ColumnsState} from '@/types/Store.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  CreateColumnParams,
  CreateColumnResponse,
  DeleteColumnParams,
  DeleteColumnResponse,
  GetAllColumnsParams,
  GetAllColumnsResponse,
  GetColumnParams,
  GetColumnResponse,
  UpdateColumnParams,
  UpdateColumnResponse,
} from './columns.types';

export const defaultColumns: ColumnsState = {
  currentColumns: [],
  isLoading: false,
  error: null,
};

export enum ColumnsPublicActions {
  GET_ALL_COLUMNS = 'getAllColumnsRequested',
  GET_COLUMN = 'getColumnRequested',
  CREATE_COLUMN = 'createColumnRequested',
  UPDATE_COLUMN = 'updateColumnRequested',
  DELETE_COLUMN = 'deleteColumnRequested',
}

export const columnsSlice = createSlice({
  name: 'lists',
  initialState: defaultLists,
  reducers: {
    [ColumnsPublicActions.GET_ALL_COLUMNS](
      state,
      action: PayloadAction<GetAllColumnsParams>,
    ) {
      state.isLoading = true;
    },
    getAllColumnsSucceeded(
      state,
      action: PayloadAction<GetAllColumnsResponse>,
    ) {
      state.currentColumns = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    getAllColumnsFailed(state, action: PayloadAction<{message: string}>) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [ColumnsPublicActions.GET_COLUMN](
      state,
      action: PayloadAction<GetColumnParams>,
    ) {
      state.isLoading = true;
    },
    getColumnSucceeded(state, action: PayloadAction<GetColumnResponse>) {
      state.currentColumns.length = 0;
      state.currentColumns.push(action.payload);
      state.isLoading = false;
    },
    getColumnFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [ColumnsPublicActions.CREATE_COLUMN](
      state,
      action: PayloadAction<CreateColumnParams>,
    ) {
      state.isLoading = true;
    },
    createColumnSucceeded(state, action: PayloadAction<CreateColumnResponse>) {
      state.currentColumns.push({
        id: action.payload.id,
        title: action.payload.title,
        userId: action.payload.user,
      });
      state.isLoading = false;
    },
    createColumnFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [ColumnsPublicActions.UPDATE_COLUMN](
      state,
      action: PayloadAction<UpdateColumnParams>,
    ) {
      state.isLoading = true;
    },
    updateColumnSucceeded(state, action: PayloadAction<UpdateColumnResponse>) {
      const targetListIndex = state.currentColumns.findIndex(
        (list) => list.id === action.payload.id,
      );

      state.currentColumns[targetListIndex] = {
        ...state.currentColumns[targetListIndex],
        ...action.payload,
      };
      state.isLoading = false;
    },
    updateColumnFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [ColumnsPublicActions.DELETE_COLUMN](
      state,
      action: PayloadAction<DeleteColumnParams>,
    ) {
      state.isLoading = true;
    },
    deleteColumnSucceeded(state, action: PayloadAction<DeleteColumnResponse>) {
      const targetListIndex = state.currentColumns.findIndex(
        (list) => list.id === action.payload.listId,
      );

      state.currentColumns.splice(targetListIndex, 1);
      state.isLoading = false;
    },
    deleteColumnFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const columnsActions = columnsSlice.actions;
export default columnsSlice.reducer;
