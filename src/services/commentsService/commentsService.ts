import fetchAPI from '@/services';
import {
  CreateCommentParams,
  CreateCommentResponse,
  DeleteCommentParams,
  DeleteCommentResponse,
  GetAllCommentsResponse,
  GetCommentParams,
  GetCommentResponse,
  UpdateCommentParams,
  UpdateCommentResponse,
} from '@/store/comments/commentsTypes';

export const getAllComments = async () => {
  const data = await fetchAPI<GetAllCommentsResponse>(
    `http://trello-purrweb.herokuapp.com/comments`,
  );

  return data;
};

export const createComment = async ({
  commentData,
  cardId,
}: CreateCommentParams) => {
  const data = await fetchAPI<CreateCommentResponse>(
    `http://trello-purrweb.herokuapp.com/cards/${cardId}/comments`,
    {
      method: 'POST',
      rawBody: commentData,
    },
  );

  return data;
};

export const getComment = async ({commentId}: GetCommentParams) => {
  const data = await fetchAPI<GetCommentResponse>(
    `http://trello-purrweb.herokuapp.com/comments/${commentId}`,
  );

  return data;
};

export const updateComment = async ({
  commentId,
  commentData,
}: UpdateCommentParams) => {
  const data = await fetchAPI<UpdateCommentResponse>(
    `http://trello-purrweb.herokuapp.com/comments/${commentId}`,
    {method: 'PUT', rawBody: commentData},
  );

  return data;
};

export const deleteComment = async ({
  commentId,
}: DeleteCommentParams): Promise<DeleteCommentResponse> => {
  const data = await fetchAPI(
    `http://trello-purrweb.herokuapp.com/comments/${commentId}`,
    {method: 'DELETE'},
  );

  return {commentId};
};
