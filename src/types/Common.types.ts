export type Prayer = {
  id: string;
  title: string;
  listId: string;
  subscribed: User[];
};
export type List = {
  id: string;
  title: string;
};
export type User = {
  id: string;
  username: string;
};
