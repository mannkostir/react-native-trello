import {Comment, User} from '@/types/Common.types';

export type GetAllCommentsParams = {
  token: string;
};
export type GetAllCommentsResponse = Comment[];

export type CreateCommentParams = Comment & {token: string};
export type CreateCommentResponse = Comment & {user: User};

export type GetCommentParams = {commentId: number; token: string};
export type GetCommentResponse = Comment;

export type UpdateCommentParams = {commentId: number; token: string} & Pick<
  Comment,
  'body' | 'created'
>;
export type UpdateCommentResponse = Comment;

export type DeleteCommentParams = {commentId: number; token: string};
export type DeleteCommentResponse = {commentId: number};
