import fetchAPI from '@/services';
import {
  CreateColumnParams,
  CreateColumnResponse,
  DeleteColumnParams,
  DeleteColumnResponse,
  GetAllColumnsParams,
  GetAllColumnsResponse,
  GetColumnParams,
  GetColumnResponse,
  UpdateColumnParams,
  UpdateColumnResponse,
} from '@/store/columns/columns.types';

export const getAllColumns = async ({token}: GetAllColumnsParams) => {
  const data = await fetchAPI<GetAllColumnsResponse>(
    'http://trello-purrweb.herokuapp.com/columns',
    {
      token,
    },
  );

  return data;
};

export const getColumn = async ({listId, token}: GetColumnParams) => {
  const data = await fetchAPI<GetColumnResponse>(
    `http://trello-purrweb.herokuapp.com/columns/${listId}`,
    {token},
  );

  return data;
};

export const createColumn = async ({token, columnData}: CreateColumnParams) => {
  const data = await fetchAPI<CreateColumnResponse>(
    `http://trello-purrweb.herokuapp.com/columns`,
    {token, method: 'POST', rawBody: columnData},
  );

  return data;
};

export const updateColumn = async ({
  listId,
  token,
  columnData,
}: UpdateColumnParams) => {
  const data = await fetchAPI<UpdateColumnResponse>(
    `http://trello-purrweb.herokuapp.com/columns/${listId}`,
    {method: 'PUT', token, rawBody: columnData},
  );

  return data;
};

export const deleteColumn = async ({listId, token}: DeleteColumnParams) => {
  const data = await fetchAPI<DeleteColumnResponse>(
    `http://trello-purrweb.herokuapp.com/columns/${listId}`,
    {token},
  );

  return data;
};
