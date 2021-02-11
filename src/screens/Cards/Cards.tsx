import AddCard from '@/components/AddCard';
import Card from '@/components/Card';
import {RootState} from '@/store';
import {cardsActions} from '@/store/cards';
import * as types from '@/types/Common.types';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const Cards = ({currentColumnId}: {currentColumnId: number}) => {
  const cards = useSelector((state: RootState) =>
    state.cards.currentCards.filter(
      (card) => card.columnId === currentColumnId,
    ),
  );
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsActions.getAllCards({token}));
  }, []);

  const [isShowingCheckedCards, setIsShowingCheckedCards] = useState(false);
  return (
    <>
      <AddCard dispatch={dispatch} columnId={currentColumnId} />
      <FlatList
        data={cards}
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
          data={cards.filter((card) => card.checked)}
          renderItem={({item}) => <Card dispatch={dispatch} card={item} />}
          keyExtractor={(card) => card.id.toString()}
          style={styles.list}
        />
      ) : null}
    </>
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
