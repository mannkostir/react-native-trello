import Card from '@/components/Card';
import * as types from '@/types/Common.types';
import React from 'react';
import {FlatList} from 'react-native';

const Subscribed = ({subscribed}: {subscribed: types.Card[]}) => {
  return (
    <FlatList
      data={subscribed}
      renderItem={({item}) => <Card card={item} />}
      keyExtractor={(prayer) => prayer.id.toString()}
    />
  );
};

export default Subscribed;
