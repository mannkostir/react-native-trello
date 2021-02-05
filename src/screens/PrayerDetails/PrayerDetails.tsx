import {PrayerDetailsRoute} from '@/types/Navigation.types';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

const PrayerDetails = () => {
  const route = useRoute<PrayerDetailsRoute>();

  return (
    <View>
      <Text>{route.params.cardInfo.title}</Text>
    </View>
  );
};

export default PrayerDetails;
