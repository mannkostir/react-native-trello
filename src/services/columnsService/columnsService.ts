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
import {API_BASE} from '@env';

export const getAllColumns = async () => {
  const data = await fetchAPI<GetAllColumnsResponse>(`${API_BASE}/columns`);

  return data;
};

export const getColumn = async ({listId}: GetColumnParams) => {
  const data = await fetchAPI<GetColumnResponse>(
    `${API_BASE}/columns/${listId}`,
  );

  return data;
};

export const createColumn = async ({columnData}: CreateColumnParams) => {
  const data = await fetchAPI<CreateColumnResponse>(`${API_BASE}/columns`, {
    method: 'POST',
    rawBody: columnData,
  });

  return data;
};

export const updateColumn = async ({
  listId,
  columnData,
}: UpdateColumnParams) => {
  const data = await fetchAPI<UpdateColumnResponse>(
    `${API_BASE}/columns/${listId}`,
    {method: 'PUT', rawBody: columnData},
  );

  return data;
};

export const deleteColumn = async ({
  listId,
}: DeleteColumnParams): Promise<DeleteColumnResponse> => {
  const data = await fetchAPI(`${API_BASE}/columns/${listId}`, {
    method: 'DELETE',
  });

  return {listId};
};
