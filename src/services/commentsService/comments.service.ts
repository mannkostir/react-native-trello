import fetchAPI from '@/services';
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
} from '@/store/comments/comments.types';

export const getAllComments = async ({token}: GetAllCommentsParams) => {
  const data = await fetchAPI<GetAllCommentsResponse>(
    `http://trello-purrweb.herokuapp.com/comments`,
    {
      token,
    },
  );

  return data;
};

export const createComment = async ({
  token,
  commentData,
  cardId,
}: CreateCommentParams) => {
  const data = await fetchAPI<CreateCommentResponse>(
    `http://trello-purrweb.herokuapp.com/cards/${cardId}/comments`,
    {
      method: 'POST',
      token,
      rawBody: commentData,
    },
  );

  return data;
};

export const getComment = async ({commentId, token}: GetCommentParams) => {
  const data = await fetchAPI<GetCommentResponse>(
    `http://trello-purrweb.herokuapp.com/comments/${commentId}`,
    {token},
  );

  return data;
};

export const updateComment = async ({
  commentId,
  token,
  commentData,
}: UpdateCommentParams) => {
  const data = await fetchAPI<UpdateCommentResponse>(
    `http://trello-purrweb.herokuapp.com/comments/${commentId}`,
    {token, method: 'PUT', rawBody: commentData},
  );

  return data;
};

export const deleteComment = async ({
  commentId,
  token,
}: DeleteCommentParams) => {
  const data = await fetchAPI<DeleteCommentResponse>(
    `http://trello-purrweb.herokuapp.com/comments/${commentId}`,
    {token},
  );

  return data;
};
