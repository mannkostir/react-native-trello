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

export const getAllCards = async () => {
  const data = await fetchAPI<GetAllCardsResponse>(
    'http://trello-purrweb.herokuapp.com/cards',
  );

  return data;
};

export const createCard = async ({columnId, cardData}: CreateCardParams) => {
  const data = await fetchAPI<CreateCardResponse>(
    `http://trello-purrweb.herokuapp.com/columns/${columnId}/cards`,
    {
      method: 'POST',
      rawBody: cardData,
    },
  );

  return data;
};

export const getCard = async ({cardId}: GetCardParams) => {
  const data = await fetchAPI<GetCardResponse>(
    `http://trello-purrweb.herokuapp.com/cards/${cardId}`,
  );

  return data;
};

export const updateCard = async ({cardId, cardData}: UpdateCardParams) => {
  const data = await fetchAPI<UpdateCardResponse>(
    `http://trello-purrweb.herokuapp.com/cards/${cardId}`,
    {rawBody: cardData, method: 'PUT'},
  );

  return data;
};

export const deleteCard = async ({
  cardId,
}: DeleteCardParams): Promise<DeleteCardResponse> => {
  await fetchAPI(`http://trello-purrweb.herokuapp.com/cards/${cardId}`, {
    method: 'DELETE',
  });

  return {cardId};
};
