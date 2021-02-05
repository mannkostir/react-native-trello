import {ListsState} from '@/types/Store.types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const defaultLists: ListsState = {
  currentLists: [],
};

interface IGetListsParams {
  token: string;
}

type GetListsResponse = {
  id: number;
  title: string;
  userId: number;
}[];

export const getLists = createAsyncThunk(
  'lists/getLists',
  async ({token}: IGetListsParams) => {
    const res = await fetch('http://trello-purrweb.herokuapp.com/columns', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const columns: GetListsResponse = await res.json();

    return columns;
  },
);

interface ICreateListParams {
  token: string;
  title: string;
  description: string;
}

export const createList = createAsyncThunk(
  'lists/createList',
  async ({title, description, token}: ICreateListParams) => {
    const res = await fetch('http://trello-purrweb.herokuapp.com/columns', {
      body: JSON.stringify({title, description}),
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const result = await res.json();

    return result;
  },
);

interface IUpdateListParams {
  token: string;
  listId: number;
}
type UpdateListResponse = {};

export const updateList = createAsyncThunk(
  'lists/editList',
  async ({listId, token}: IUpdateListParams) => {
    const res = await fetch(
      `http://trello-purrweb.herokuapp.com/columns/${listId}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );

    const result: UpdateListResponse = await res.json();

    return result;
  },
);

export const listsSlice = createSlice({
  name: 'lists',
  initialState: defaultLists,
  reducers: {},
});
