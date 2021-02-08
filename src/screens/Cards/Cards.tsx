import Card from '@/components/Card';
import * as types from '@/types/Common.types';
import React from 'react';
import {FlatList} from 'react-native';

const Cards = ({cards}: {cards: types.Card[]}) => {
  return (
    <FlatList
      data={cards}
      renderItem={({item}) => <Card card={item} />}
      keyExtractor={(card) => card.id.toString()}
    />
  );
};

export default Cards;
