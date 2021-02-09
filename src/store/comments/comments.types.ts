import {Comment, User} from '@/types/Common.types';

export interface GetAllCommentsParams {
  token: string;
}
export type GetAllCommentsResponse = Comment[];

export type CreateCommentParams = {
  commentData: Comment;
  token: string;
};
export type CreateCommentResponse = Comment & {user: User};

export type GetCommentParams = {commentId: number; token: string};
export type GetCommentResponse = Comment;

export type UpdateCommentParams = {
  commentData: Pick<Comment, 'body' | 'created'>;
  commentId: number;
  token: string;
};
export type UpdateCommentResponse = Comment;

export type DeleteCommentParams = {commentId: number; token: string};
export type DeleteCommentResponse = {commentId: number};
