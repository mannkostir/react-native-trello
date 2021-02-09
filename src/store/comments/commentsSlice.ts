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
    ) {
      state.isLoading = true;
    },
    getAllCommentsSucceeded(
      state,
      action: PayloadAction<GetAllCommentsResponse>,
    ) {
      state.currentComments = action.payload;
      state.isLoading = false;
    },
    getAllCommentsFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [CommentsPublicActions.CREATE_COMMENT](
      state,
      action: PayloadAction<CreateCommentParams>,
    ) {
      state.isLoading = true;
    },
    createCommentSucceeded(
      state,
      action: PayloadAction<CreateCommentResponse>,
    ) {
      const {user, ...commentData} = action.payload;
      state.currentComments.push(commentData);
      state.isLoading = false;
    },
    createCommentFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [CommentsPublicActions.GET_COMMENT](
      state,
      action: PayloadAction<GetCommentParams>,
    ) {
      state.isLoading = true;
    },
    getCommentSucceeded(state, action: PayloadAction<GetCommentResponse>) {
      state.currentComments.length = 0;
      state.currentComments.push(action.payload);
      state.isLoading = false;
    },
    getCommentFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [CommentsPublicActions.UPDATE_COMMENT](
      state,
      action: PayloadAction<UpdateCommentParams>,
    ) {
      state.isLoading = true;
    },
    updateCommentSucceeded(
      state,
      action: PayloadAction<UpdateCommentResponse>,
    ) {
      const targetCommentIndex = state.currentComments.findIndex(
        (comment) => comment.id === action.payload.id,
      );

      state.currentComments[targetCommentIndex] = action.payload;

      state.isLoading = false;
    },
    updateCommentFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [CommentsPublicActions.DELETE_COMMENT](
      state,
      action: PayloadAction<DeleteCommentParams>,
    ) {
      state.isLoading = true;
    },
    deleteCommentSucceeded(
      state,
      action: PayloadAction<DeleteCommentResponse>,
    ) {
      const targetCommentIndex = state.currentComments.findIndex(
        (comment) => comment.id === action.payload.commentId,
      );

      state.currentComments.splice(targetCommentIndex, 1);

      state.isLoading = false;
    },
    deleteCommentFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
