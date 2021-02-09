import AddCard from '@/components/AddCard';
import Card from '@/components/Card';
import * as types from '@/types/Common.types';
import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

const Cards = ({
  uncheckedCards,
  checkedCards,
}: {
  uncheckedCards: types.Card[];
  checkedCards: types.Card[];
}) => {
  const [isShowingCheckedCards, setIsShowingCheckedCards] = useState(false);
  return (
    <>
      <AddCard />
      <FlatList
        data={uncheckedCards}
        renderItem={({item}) => <Card card={item} />}
        keyExtractor={(card) => card.id.toString()}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.toggleAnsweredVisibilityBtn}
        onPress={() => setIsShowingCheckedCards((isShowing) => !isShowing)}>
        <Text>
          {isShowingCheckedCards
            ? 'HIDE ANSWERED PRAYERS'
            : 'SHOW ANSWERED PRAYERS'}
        </Text>
      </TouchableOpacity>
      {isShowingCheckedCards ? (
        <FlatList
          data={checkedCards}
          renderItem={({item}) => <Card card={item} />}
          keyExtractor={(card) => card.id.toString()}
          style={styles.list}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  toggleAnsweredVisibilityBtn: {
    backgroundColor: '#BFB393',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
  },
  list: {
    flexGrow: 0,
  },
});

export default Cards;
