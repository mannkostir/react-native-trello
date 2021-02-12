import AddCard from '@/components/AddCard';
import Card from '@/components/Card';
import * as types from '@/types/Common.types';
import React from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch} from 'react-redux';

const Subscribed = ({
  subscribed,
  currentColumnId,
}: {
  subscribed: types.Card[];
  currentColumnId: number;
}) => {
  const dispatch = useDispatch();
  return (
    <View style={{paddingVertical: 30, paddingHorizontal: 20}}>
      <AddCard columnId={currentColumnId} dispatch={dispatch} />
      <FlatList
        data={subscribed}
        renderItem={({item}) => <Card dispatch={dispatch} card={item} />}
        keyExtractor={(prayer) => prayer.id.toString()}
      />
    </View>
  );
};

export default Subscribed;
