import AddCard from '@/components/AddCard';
import Card from '@/components/Card';
import EditCardModal from '@/components/EditCardModal';
import MainText from '@/components/MainText';
import {RootState} from '@/store';
import {cardsActions, useCardsSelector} from '@/store/cards';
import {useColumnsSelector} from '@/store/columns';
import * as types from '@/types/commonTypes';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useDispatch, useSelector} from 'react-redux';
import {LeftActions, RightActions} from './SwipeableActions';

const Cards = ({currentColumnId}: {currentColumnId: number}) => {
  const {getCurrentCards, isCardsLoading} = useCardsSelector();
  const {getColumn} = useColumnsSelector();

  const currentCards = getCurrentCards(currentColumnId);
  const currentColumn = getColumn(currentColumnId);

  const dispatch = useDispatch();

  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  useEffect(() => {
    Alert.alert(
      'Swipe left to see edit option. Swipe right to see delete option',
    );
  }, []);

  useEffect(() => {
    dispatch(cardsActions.getAllCards());
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
          column: currentColumn,
        }),
      );
    }

    disableCardEditMode();
  };

  const handleCardDelete = (cardId: number) => {
    dispatch(
      cardsActions.deleteCard({
        cardId,
      }),
    );
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
      {currentCards.find((card) => !card.checked) ? (
        <FlatList
          data={currentCards.filter((card) => !card.checked)}
          renderItem={({item}) => (
            <View>
              <Swipeable
                overshootLeft={false}
                overshootRight={false}
                renderRightActions={() => (
                  <RightActions
                    handleEditPress={() => enableCardEditMode(item.id)}
                  />
                )}
                renderLeftActions={() => (
                  <LeftActions
                    handleDeletePress={() => handleCardDelete(item.id)}
                  />
                )}>
                <Card dispatch={dispatch} card={item} />
              </Swipeable>
            </View>
          )}
          keyExtractor={(card) => card.id.toString()}
          style={styles.list}
        />
      ) : null}
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
            <View>
              <Swipeable
                overshootLeft={false}
                overshootRight={false}
                renderLeftActions={() => (
                  <LeftActions
                    handleDeletePress={() => handleCardDelete(item.id)}
                  />
                )}>
                <Card dispatch={dispatch} card={item} />
              </Swipeable>
            </View>
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
