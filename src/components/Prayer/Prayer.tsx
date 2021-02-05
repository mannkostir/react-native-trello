import * as types from '@/types/Common.types';
import {ListScreenNavigation} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

const Prayer = ({card}: {card: types.Prayer}) => {
  const navigation = useNavigation<ListScreenNavigation>();
  return (
    <View>
      <Text
        onPress={() => navigation.navigate('PrayerDetails', {cardInfo: card})}>
        {card.title}
      </Text>
    </View>
  );
};

export default Prayer;
