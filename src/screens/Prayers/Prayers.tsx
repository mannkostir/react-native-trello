import Prayer from '@/components/Prayer';
import * as types from '@/types/Common.types';
import React from 'react';
import {FlatList} from 'react-native';

const Prayers = ({cards}: {cards: types.Prayer[]}) => {
  return (
    <FlatList
      data={cards}
      renderItem={({item}) => <Prayer card={item} />}
      keyExtractor={(card) => card.id}
    />
  );
};

export default Prayers;
