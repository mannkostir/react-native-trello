import {RootState} from '..';

export const getCurrentCards = (state: RootState) => state.cards.currentCards;
export const getSelectedCard = (state: RootState) => state.cards.selectedCard;
