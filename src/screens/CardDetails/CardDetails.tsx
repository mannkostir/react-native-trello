import {CardDetailsRoute} from '@/types/Navigation.types';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

const CardDetails = () => {
  const route = useRoute<CardDetailsRoute>();

  return (
    <View>
      <Text>{route.params.cardInfo.title}</Text>
    </View>
  );
};

export default CardDetails;
