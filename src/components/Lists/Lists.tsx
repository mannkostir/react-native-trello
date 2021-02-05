import {Prayer, List} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ListItem = ({
  title,
  id,
  cards,
  navigation,
}: {
  title: string;
  id: string;
  cards: Prayer[];
  navigation: BoardScreenNavigation;
}) => {
  return (
    <View>
      <Text
        onPress={() =>
          navigation.navigate('List', {
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
  lists: List[];
  cards: Prayer[];
  navigation: BoardScreenNavigation;
}

const Lists = ({lists, navigation, cards}: IListsProps) => {
  return (
    <SafeAreaView>
      <FlatList
        data={lists}
        renderItem={({item}) => (
          <ListItem
            cards={cards.filter((card) => card.listId === item.id)}
            navigation={navigation}
            title={item.title}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Lists;
