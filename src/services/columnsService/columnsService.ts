import fetchAPI from '@/services';
import {
  CreateColumnParams,
  CreateColumnResponse,
  DeleteColumnParams,
  DeleteColumnResponse,
  GetAllColumnsResponse,
  GetColumnParams,
  GetColumnResponse,
  UpdateColumnParams,
  UpdateColumnResponse,
} from '@/store/columns/columnsTypes';

export const getAllColumns = async () => {
  const data = await fetchAPI<GetAllColumnsResponse>(
    'http://trello-purrweb.herokuapp.com/columns',
  );

  return data;
};

export const getColumn = async ({listId}: GetColumnParams) => {
  const data = await fetchAPI<GetColumnResponse>(
    `http://trello-purrweb.herokuapp.com/columns/${listId}`,
  );

  return data;
};

export const createColumn = async ({columnData}: CreateColumnParams) => {
  const data = await fetchAPI<CreateColumnResponse>(
    `http://trello-purrweb.herokuapp.com/columns`,
    {method: 'POST', rawBody: columnData},
  );

  return data;
};

export const updateColumn = async ({
  listId,
  columnData,
}: UpdateColumnParams) => {
  const data = await fetchAPI<UpdateColumnResponse>(
    `http://trello-purrweb.herokuapp.com/columns/${listId}`,
    {method: 'PUT', rawBody: columnData},
  );

  return data;
};

export const deleteColumn = async ({
  listId,
}: DeleteColumnParams): Promise<DeleteColumnResponse> => {
  const data = await fetchAPI(
    `http://trello-purrweb.herokuapp.com/columns/${listId}`,
    {method: 'DELETE'},
  );

  return {listId};
};
