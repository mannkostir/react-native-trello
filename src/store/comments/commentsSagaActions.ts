import {createAction} from '@reduxjs/toolkit';
import {
  CreateCommentParams,
  DeleteCommentParams,
  GetCommentParams,
  UpdateCommentParams,
} from './commentsTypes';

enum CommentsPublicActions {
  GET_ALL_COMMENTS = 'getAllCommentsRequested',
  CREATE_COMMENT = 'createCommentRequested',
  GET_COMMENT = 'getCommentRequested',
  UPDATE_COMMENT = 'updateCommentRequested',
  DELETE_COMMENT = 'deleteCommentRequested',
}

export const getAllComments = createAction(
  CommentsPublicActions.GET_ALL_COMMENTS,
);
export const createComment = createAction<CreateCommentParams>(
  CommentsPublicActions.CREATE_COMMENT,
);
export const getComment = createAction<GetCommentParams>(
  CommentsPublicActions.GET_COMMENT,
);
export const updateComment = createAction<UpdateCommentParams>(
  CommentsPublicActions.UPDATE_COMMENT,
);
export const deleteComment = createAction<DeleteCommentParams>(
  CommentsPublicActions.DELETE_COMMENT,
);
