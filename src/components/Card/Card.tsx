import * as types from '@/types/commonTypes';
import {ColumnScreenNavigator} from '@/types/navigationTypes';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {cardsActions} from '@/store/cards';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import MainText from '../MainText';
import EditCardModal from '../EditCardModal';

const Card = ({
  card,
  dispatch,
}: {
  card: types.Card;
  dispatch: React.Dispatch<any>;
}) => {
  const column = useSelector(
    (state: RootState) =>
      state.columns.currentColumns.find(
        (column) => column.id === card.columnId,
      ) || null,
  );

  const navigation = useNavigation<ColumnScreenNavigator>();

  const toggleCheckCard = () => {
    // Wait for animation to finish first (for ios)
    const timeoutDuration = Platform.OS === 'ios' ? 500 : 0;
    if (card) {
      setTimeout(() => {
        dispatch(
          cardsActions.updateCard({
            cardData: {...card, checked: !card.checked},
            cardId: card.id,
            column,
          }),
        );
      }, timeoutDuration);
    }
  };
  return (
    <View style={[styles.card]}>
      <CheckBox
        value={card.checked}
        onValueChange={toggleCheckCard}
        style={styles.cardCheckbox}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CardDetails', {
              cardId: card.id,
              title: card.title,
            })
          }>
          <MainText numberOfLines={1} style={styles.cardText}>
            {card.title}
          </MainText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  cardCheckbox: {
    marginRight: 20,
  },
  cardText: {},
  buttonsWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 20,
    flexDirection: 'row',
  },
  cardDeleteBtn: {
    backgroundColor: '#AC5253',
    justifyContent: 'center',
  },
  cardDeleteBtnText: {
    color: '#ffffff',
  },
  editCardBtn: {
    backgroundColor: '#72A8BC',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  editCardBtnText: {
    color: '#ffffff',
  },
});

export default Card;
