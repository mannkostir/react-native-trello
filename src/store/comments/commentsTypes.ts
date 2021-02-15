import {Card, Comment, User} from '@/types/commonTypes';

export type GetAllCommentsResponse = Comment[];

export type CreateCommentParams = {
  commentData: Pick<Comment, 'body' | 'created'>;
  cardId: number;
};
export type CreateCommentResponse = Comment & {user: User; card: Card};

export type GetCommentParams = {commentId: number};
export type GetCommentResponse = Comment;

export type UpdateCommentParams = {
  commentData: Pick<Comment, 'body' | 'created'>;
  commentId: number;
};
export type UpdateCommentResponse = Comment;

export type DeleteCommentParams = {commentId: number};
export type DeleteCommentResponse = {commentId: number};
