import * as types from '@/types/Common.types';
import {ColumnScreenNavigator} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

const Card = ({card}: {card: types.Card}) => {
  const navigation = useNavigation<ColumnScreenNavigator>();
  return (
    <View>
      <Text
        onPress={() => navigation.navigate('CardDetails', {cardInfo: card})}>
        {card.title}
      </Text>
    </View>
  );
};

export default Card;
