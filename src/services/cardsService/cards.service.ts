import fetchAPI from '@/services';
import {
  CreateCardParams,
  CreateCardResponse,
  DeleteCardParams,
  DeleteCardResponse,
  GetAllCardsParams,
  GetAllCardsResponse,
  GetCardParams,
  GetCardResponse,
  UpdateCardParams,
  UpdateCardResponse,
} from '@/store/cards/cards.types';

export const getAllCards = async ({token}: GetAllCardsParams) => {
  const data = await fetchAPI<GetAllCardsResponse>(
    'http://trello-purrweb.herokuapp.com/cards',
    {
      token,
    },
  );

  return data;
};

export const createCard = async ({token, cardData}: CreateCardParams) => {
  const data = await fetchAPI<CreateCardResponse>(
    'http://trello-purrweb.herokuapp.com/cards',
    {
      token,
      method: 'POST',
      rawBody: cardData,
    },
  );

  return data;
};

export const getCard = async ({cardId, token}: GetCardParams) => {
  const data = await fetchAPI<GetCardResponse>(
    `http://trello-purrweb.herokuapp.com/cards/${cardId}`,
    {token},
  );

  return data;
};

export const updateCard = async ({
  token,
  cardId,
  cardData,
}: UpdateCardParams) => {
  const data = await fetchAPI<UpdateCardResponse>(
    `http://trello-purrweb.herokuapp.com/cards/${cardId}`,
    {token, rawBody: cardData, method: 'PUT'},
  );

  return data;
};

export const deleteCard = async ({cardId, token}: DeleteCardParams) => {
  const data = await fetchAPI<DeleteCardResponse>(
    `http://trello-purrweb.herokuapp.com/cards/${cardId}`,
    {method: 'DELETE', token},
  );

  return data;
};
