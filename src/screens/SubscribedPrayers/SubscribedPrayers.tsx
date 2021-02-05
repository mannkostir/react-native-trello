import Prayer from '@/components/Prayer';
import * as types from '@/types/Common.types';
import React from 'react';
import {FlatList} from 'react-native';

const SubscribedPrayers = ({
  subscribedPrayers,
}: {
  subscribedPrayers: types.Prayer[];
}) => {
  return (
    <FlatList
      data={subscribedPrayers}
      renderItem={({item}) => <Prayer card={item} />}
      keyExtractor={(prayer) => prayer.id}
    />
  );
};

export default SubscribedPrayers;
