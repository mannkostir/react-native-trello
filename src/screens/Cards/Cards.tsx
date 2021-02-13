import AddCard from '@/components/AddCard';
import Card from '@/components/Card';
import EditCardModal from '@/components/EditCardModal';
import MainText from '@/components/MainText';
import {RootState} from '@/store';
import {cardsActions} from '@/store/cards';
import * as types from '@/types/Common.types';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const Cards = ({currentColumnId}: {currentColumnId: number}) => {
  const {currentCards, isCardsLoading, token, currentColumn} = useSelector(
    (state: RootState) => ({
      currentCards: state.cards.currentCards.filter(
        (card) => card.columnId === currentColumnId,
      ),
      isCardsLoading: state.cards.isLoading,
      token: state.auth.currentUser?.token || null,
      currentColumn:
        state.columns.currentColumns.find(
          (column) => column.id === currentColumnId,
        ) || null,
    }),
  );
  const dispatch = useDispatch();

  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(cardsActions.getAllCards({token}));
  }, []);

  const [isShowingCheckedCards, setIsShowingCheckedCards] = useState(false);

  const handleCardTitleChange = ({
    newTitle,
    card,
  }: {
    newTitle: string;
    card: types.Card | null;
  }) => {
    if (newTitle && currentColumn && card) {
      dispatch(
        cardsActions.updateCard({
          cardData: {
            checked: card.checked,
            description: card.description,
            title: newTitle,
          },
          cardId: card.id,
          token,
          column: currentColumn,
        }),
      );
    }

    disableCardEditMode();
  };

  const enableCardEditMode = (cardId: number) => {
    setEditingCardId(cardId);
  };
  const disableCardEditMode = () => {
    setEditingCardId(null);
  };

  return isCardsLoading ? (
    <MainText style={{marginTop: 50, alignSelf: 'center'}}>LOADING...</MainText>
  ) : (
    <View style={styles.container}>
      <EditCardModal
        card={currentCards.find((card) => card.id === editingCardId) || null}
        onSubmit={handleCardTitleChange}
        onDiscard={disableCardEditMode}
        visible={!!editingCardId}
        onRequestClose={disableCardEditMode}
      />
      <AddCard dispatch={dispatch} columnId={currentColumnId} />
      <FlatList
        data={currentCards.filter((card) => !card.checked)}
        renderItem={({item}) => (
          <Card
            enableCardEditMode={() => enableCardEditMode(item.id)}
            dispatch={dispatch}
            card={item}
          />
        )}
        keyExtractor={(card) => card.id.toString()}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.toggleAnsweredVisibilityBtn}
        onPress={() => setIsShowingCheckedCards((isShowing) => !isShowing)}>
        <MainText style={{color: '#fff'}}>
          {isShowingCheckedCards
            ? 'HIDE ANSWERED PRAYERS'
            : 'SHOW ANSWERED PRAYERS'}
        </MainText>
      </TouchableOpacity>
      {isShowingCheckedCards && currentCards.find((card) => card.checked) ? (
        <FlatList
          data={currentCards.filter((card) => card.checked)}
          renderItem={({item}) => (
            <Card
              enableCardEditMode={() => enableCardEditMode(item.id)}
              dispatch={dispatch}
              card={item}
            />
          )}
          keyExtractor={(card) => card.id.toString()}
          style={styles.list}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 15,
  },
  toggleAnsweredVisibilityBtn: {
    backgroundColor: '#BFB393',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 25,
  },
  list: {flex: 1},
});

export default Cards;
