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
import {API_BASE} from '@env';

export const getAllComments = async () => {
  const data = await fetchAPI<GetAllCommentsResponse>(`${API_BASE}/comments`);

  return data;
};

export const createComment = async ({
  commentData,
  cardId,
}: CreateCommentParams) => {
  const data = await fetchAPI<CreateCommentResponse>(
    `${API_BASE}/cards/${cardId}/comments`,
    {
      method: 'POST',
      rawBody: commentData,
    },
  );

  return data;
};

export const getComment = async ({commentId}: GetCommentParams) => {
  const data = await fetchAPI<GetCommentResponse>(
    `${API_BASE}/comments/${commentId}`,
  );

  return data;
};

export const updateComment = async ({
  commentId,
  commentData,
}: UpdateCommentParams) => {
  const data = await fetchAPI<UpdateCommentResponse>(
    `${API_BASE}/comments/${commentId}`,
    {method: 'PUT', rawBody: commentData},
  );

  return data;
};

export const deleteComment = async ({
  commentId,
}: DeleteCommentParams): Promise<DeleteCommentResponse> => {
  const data = await fetchAPI(`${API_BASE}/comments/${commentId}`, {
    method: 'DELETE',
  });

  return {commentId};
};
