import {Card, Column} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ListItem = ({
  title,
  id,
  cards,
  navigation,
}: {
  title: string;
  id: number;
  cards: Card[];
  navigation: BoardScreenNavigation;
}) => {
  return (
    <View style={styles.column}>
      <Text
        style={styles.columnText}
        onPress={() =>
          navigation.navigate('Column', {
            title,
            cards,
          })
        }>
        {title}
      </Text>
    </View>
  );
};

interface IListsProps {
  lists: Column[];
  cards: Card[];
  navigation: BoardScreenNavigation;
}

const Lists = ({lists, navigation, cards}: IListsProps) => {
  return (
    <SafeAreaView>
      <FlatList
        data={lists}
        renderItem={({item}) => (
          <ListItem
            cards={cards.filter((card) => card.columnId === item.id)}
            navigation={navigation}
            title={item.title}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  column: {
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    fontSize: 17,
    marginBottom: 7,
  },
  columnText: {
    fontWeight: '700',
  },
});

export default Lists;
