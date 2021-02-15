import fetchAPI from '@/services';
import {
  CreateCardParams,
  CreateCardResponse,
  DeleteCardParams,
  DeleteCardResponse,
  GetAllCardsResponse,
  GetCardParams,
  GetCardResponse,
  UpdateCardParams,
  UpdateCardResponse,
} from '@/store/cards/cardsTypes';
import {API_BASE} from '@env';

export const getAllCards = async () => {
  const data = await fetchAPI<GetAllCardsResponse>(`${API_BASE}/cards`);

  return data;
};

export const createCard = async ({columnId, cardData}: CreateCardParams) => {
  const data = await fetchAPI<CreateCardResponse>(
    `${API_BASE}/columns/${columnId}/cards`,
    {
      method: 'POST',
      rawBody: cardData,
    },
  );

  return data;
};

export const getCard = async ({cardId}: GetCardParams) => {
  const data = await fetchAPI<GetCardResponse>(`${API_BASE}/cards/${cardId}`);

  return data;
};

export const updateCard = async ({cardId, cardData}: UpdateCardParams) => {
  const data = await fetchAPI<UpdateCardResponse>(
    `${API_BASE}/cards/${cardId}`,
    {rawBody: cardData, method: 'PUT'},
  );

  return data;
};

export const deleteCard = async ({
  cardId,
}: DeleteCardParams): Promise<DeleteCardResponse> => {
  await fetchAPI(`${API_BASE}/cards/${cardId}`, {
    method: 'DELETE',
  });

  return {cardId};
};
