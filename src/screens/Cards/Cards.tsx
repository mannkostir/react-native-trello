import AddCard from '@/components/AddCard';
import Card from '@/components/Card';
import {RootState} from '@/store';
import {cardsActions} from '@/store/cards';
import * as types from '@/types/Common.types';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const Cards = ({currentColumnId}: {currentColumnId: number}) => {
  const {currentCards, isCardsLoading, token} = useSelector(
    (state: RootState) => ({
      currentCards: state.cards.currentCards.filter(
        (card) => card.columnId === currentColumnId,
      ),
      isCardsLoading: state.cards.isLoading,
      token: state.auth.currentUser?.token || null,
    }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsActions.getAllCards({token}));
  }, []);

  const [isShowingCheckedCards, setIsShowingCheckedCards] = useState(false);
  return (
    <ScrollView
      style={{paddingTop: 25, paddingHorizontal: 15, paddingBottom: 30}}>
      <AddCard dispatch={dispatch} columnId={currentColumnId} />
      <FlatList
        data={currentCards.filter((card) => !card.checked)}
        renderItem={({item}) => <Card dispatch={dispatch} card={item} />}
        keyExtractor={(card) => card.id.toString()}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.toggleAnsweredVisibilityBtn}
        onPress={() => setIsShowingCheckedCards((isShowing) => !isShowing)}>
        <Text>
          {isShowingCheckedCards
            ? 'HIDE ANSWERED PRAYERS'
            : 'SHOW ANSWERED PRAYERS'}
        </Text>
      </TouchableOpacity>
      {isShowingCheckedCards ? (
        <FlatList
          data={currentCards.filter((card) => card.checked)}
          renderItem={({item}) => <Card dispatch={dispatch} card={item} />}
          keyExtractor={(card) => card.id.toString()}
          style={styles.list}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  toggleAnsweredVisibilityBtn: {
    backgroundColor: '#BFB393',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
  },
  list: {
    flexGrow: 0,
  },
});

export default Cards;
