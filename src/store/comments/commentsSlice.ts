import {CommentsState} from '@/types/storeTypes';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {commentActions} from '.';
import {
  CreateCommentResponse,
  DeleteCommentResponse,
  GetAllCommentsResponse,
  GetCommentResponse,
  UpdateCommentResponse,
} from './commentsTypes';

export const defaultComments: CommentsState = {
  currentComments: [],
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: defaultComments,
  reducers: {
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
    createCommentSucceeded(
      state,
      action: PayloadAction<CreateCommentResponse>,
    ) {
      const {user, card, ...commentData} = action.payload;
      state.currentComments.push(commentData);
      state.isLoading = false;
    },
    createCommentFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
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
    updateCommentSucceeded(
      state,
      action: PayloadAction<UpdateCommentResponse>,
    ) {
      const targetCommentIndex = state.currentComments.findIndex(
        (comment) => comment.id === action.payload.id,
      );

      state.currentComments[targetCommentIndex] = action.payload;

      state.isLoading = false;
      console.log(action.payload.body);
    },
    updateCommentFailed(state, action: PayloadAction<{message: string}>) {
      state.error = action.payload.message;
      state.isLoading = false;
      console.error(action.payload.message);
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
  extraReducers: (builder) =>
    builder
      .addCase(commentActions.getAllComments, (state) => {
        state.isLoading = true;
      })
      .addCase(commentActions.createComment, (state) => {
        state.isLoading = true;
      })
      .addCase(commentActions.getComment, (state) => {
        state.isLoading = true;
      })
      .addCase(commentActions.updateComment, (state) => {
        state.isLoading = true;
      })
      .addCase(commentActions.deleteComment, (state) => {
        state.isLoading = true;
      }),
});

export const commentsInternalActions = commentsSlice.actions;
export default commentsSlice.reducer;
