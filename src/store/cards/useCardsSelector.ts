import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '..';

export const useCardsSelector = () => {
  const cardsState = useSelector((state: RootState) => state.cards);

  const getCurrentCards = useCallback(
    (columnId: number) =>
      cardsState.currentCards.filter((card) => card.columnId === columnId),
    [cardsState.currentCards],
  );

  const getCard = (cardId: number) =>
    cardsState.currentCards.find((card) => card.id === cardId) || null;

  const isCardsLoading = useMemo(
    () => cardsState.isLoading && cardsState.currentCards.length,
    [cardsState.isLoading, cardsState.currentCards],
  );

  return {
    getCurrentCards,
    getCard,
    isCardsLoading,
    selectedCard: cardsState.selectedCard,
  };
};
