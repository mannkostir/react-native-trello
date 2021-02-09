import * as types from '@/types/Common.types';
import {ColumnScreenNavigator} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

const Card = ({card}: {card: types.Card}) => {
  const navigation = useNavigation<ColumnScreenNavigator>();
  const [isChecked, setIsChecked] = useState(card.checked);
  return (
    <View style={styles.card}>
      <CheckBox
        value={isChecked}
        onValueChange={(isChecked) => setIsChecked(isChecked)}
        style={styles.cardCheckbox}
      />
      <Text
        onPress={() => navigation.navigate('CardDetails', {cardInfo: card})}
        style={styles.cardText}>
        {card.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    padding: 15,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCheckbox: {
    marginRight: 5,
  },
  cardText: {
    flex: 1,
  },
});

export default Card;
