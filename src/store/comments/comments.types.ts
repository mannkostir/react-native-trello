import {AuthToken, Card, Comment, User} from '@/types/Common.types';

export type GetAllCommentsParams = {
  token: AuthToken;
};
export type GetAllCommentsResponse = Comment[];

export type CreateCommentParams = {
  commentData: Pick<Comment, 'body' | 'created'>;
  token: AuthToken;
  cardId: number;
};
export type CreateCommentResponse = Comment & {user: User; card: Card};

export type GetCommentParams = {commentId: number; token: AuthToken};
export type GetCommentResponse = Comment;

export type UpdateCommentParams = {
  commentData: Pick<Comment, 'body' | 'created'>;
  commentId: number;
  token: AuthToken;
};
export type UpdateCommentResponse = Comment;

export type DeleteCommentParams = {commentId: number; token: AuthToken};
export type DeleteCommentResponse = {commentId: number};
