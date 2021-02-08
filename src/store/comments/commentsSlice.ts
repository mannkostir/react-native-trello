import {CommentsState} from '@/types/Store.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  CreateCommentParams,
  CreateCommentResponse,
  DeleteCommentParams,
  DeleteCommentResponse,
  GetAllCommentsParams,
  GetAllCommentsResponse,
  GetCommentParams,
  GetCommentResponse,
  UpdateCommentParams,
  UpdateCommentResponse,
} from './comments.types';

export const defaultComments: CommentsState = {
  currentComments: [],
  isLoading: false,
  error: null,
};

export enum CommentsPublicActions {
  GET_ALL_COMMENTS = 'getAllCommentsRequested',
  CREATE_COMMENT = 'createCommentRequested',
  GET_COMMENT = 'getCommentRequested',
  UPDATE_COMMENT = 'updateCommentRequested',
  DELETE_COMMENT = 'deleteCommentRequested',
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: defaultComments,
  reducers: {
    [CommentsPublicActions.GET_ALL_COMMENTS](
      state,
      action: PayloadAction<GetAllCommentsParams>,
    ) {},
    getAllCommentsSucceeded(
      state,
      action: PayloadAction<GetAllCommentsResponse>,
    ) {},
    getAllCommentsFailed(state, action: PayloadAction<{message: string}>) {},
    [CommentsPublicActions.CREATE_COMMENT](
      state,
      action: PayloadAction<CreateCommentParams>,
    ) {},
    createCommentSucceeded(
      state,
      action: PayloadAction<CreateCommentResponse>,
    ) {},
    createCommentFailed(state, action: PayloadAction<{message: string}>) {},
    [CommentsPublicActions.GET_COMMENT](
      state,
      action: PayloadAction<GetCommentParams>,
    ) {},
    getCommentSucceeded(state, action: PayloadAction<GetCommentResponse>) {},
    getCommentFailed(state, action: PayloadAction<{message: string}>) {},
    [CommentsPublicActions.UPDATE_COMMENT](
      state,
      action: PayloadAction<UpdateCommentParams>,
    ) {},
    updateCommentSucceeded(
      state,
      action: PayloadAction<UpdateCommentResponse>,
    ) {},
    updateCommentFailed(state, action: PayloadAction<{message: string}>) {},
    [CommentsPublicActions.DELETE_COMMENT](
      state,
      action: PayloadAction<DeleteCommentParams>,
    ) {},
    deleteCommentSucceeded(
      state,
      action: PayloadAction<DeleteCommentResponse>,
    ) {},
    deleteCommentFailed(state, action: PayloadAction<{message: string}>) {},
  },
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
