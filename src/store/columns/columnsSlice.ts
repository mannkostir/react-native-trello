import {ColumnsState} from '@/types/Store.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {columnsActions} from '.';
import {
  CreateColumnResponse,
  DeleteColumnResponse,
  GetAllColumnsResponse,
  GetColumnResponse,
  UpdateColumnResponse,
} from './columns.types';

export const defaultColumns: ColumnsState = {
  currentColumns: [],
  isLoading: false,
  error: null,
};

const columnsSlice = createSlice({
  name: 'lists',
  initialState: defaultColumns,
  reducers: {
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
      throw new Error(action.payload.message);
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
    createColumnSucceeded(state, action: PayloadAction<CreateColumnResponse>) {
      state.currentColumns.unshift({
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
  extraReducers: (builder) =>
    builder
      .addCase(columnsActions.getAllColumns, (state) => {
        state.isLoading = true;
      })
      .addCase(columnsActions.createColumn, (state) => {
        state.isLoading = true;
      })
      .addCase(columnsActions.getColumn, (state) => {
        state.isLoading = true;
      })
      .addCase(columnsActions.updateColumn, (state) => {
        state.isLoading = true;
      })
      .addCase(columnsActions.deleteColumn, (state) => {
        state.isLoading = true;
      }),
});

export const columnsInternalActions = columnsSlice.actions;
export default columnsSlice.reducer;
