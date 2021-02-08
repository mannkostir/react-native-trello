export type Card = {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  columnId: number;
  commentsIds: number[];
  // subscribed: User[];
};
export type Column = {
  id: number;
  title: string;
  userId: number;
};
export type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export type Comment = {
  id: number;
  body: string;
  created: string;
  userId: number;
};

export type Unpromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
