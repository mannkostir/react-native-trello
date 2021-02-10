import Lists from '@/components/Columns/Columns';
import {RootState} from '@/store';
import {Card, Column} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Board = () => {
  const navigation = useNavigation<BoardScreenNavigation>();
  const state = useSelector((state: RootState) => ({
    cards: state.cards,
    columns: state.columns,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch();
  });

  return (
    <View>
      <Lists
        navigation={navigation}
        cards={state.cards.currentCards}
        lists={state.columns.currentColumns}
      />
    </View>
  );
};

export default Board;
