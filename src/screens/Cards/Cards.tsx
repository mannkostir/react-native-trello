import AddCard from '@/components/AddCard';
import Card from '@/components/Card';
import MainText from '@/components/MainText';
import {RootState} from '@/store';
import {cardsActions} from '@/store/cards';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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
  return isCardsLoading ? (
    <MainText style={{marginTop: 50, alignSelf: 'center'}}>LOADING...</MainText>
  ) : (
    <View style={styles.container}>
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
        <MainText style={{color: '#fff'}}>
          {isShowingCheckedCards
            ? 'HIDE ANSWERED PRAYERS'
            : 'SHOW ANSWERED PRAYERS'}
        </MainText>
      </TouchableOpacity>
      {isShowingCheckedCards && currentCards.find((card) => card.checked) ? (
        <FlatList
          data={currentCards.filter((card) => card.checked)}
          renderItem={({item}) => <Card dispatch={dispatch} card={item} />}
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
