import Lists from '@/components/Lists/Lists';
import {Prayer, List} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

const ListsItems: List[] = [
  {
    id: '1',
    title: 'To Do',
  },
  {
    id: '2',
    title: 'In Progress',
  },
  {
    id: '3',
    title: 'Testing',
  },
  {
    id: '4',
    title: 'Done',
  },
];

const Cards: Prayer[] = [
  {title: 'First Item', id: '1', listId: '1', subscribed: []},
  {title: 'Second Item', id: '2', listId: '2', subscribed: []},
  {title: 'Third Item', id: '3', listId: '3', subscribed: []},
  {title: 'Fourth Item', id: '4', listId: '4', subscribed: []},
  {title: 'Fifth Item', id: '5', listId: '1', subscribed: []},
];

const Board = () => {
  const navigation = useNavigation<BoardScreenNavigation>();
  return (
    <View>
      <Lists navigation={navigation} cards={Cards} lists={ListsItems} />
    </View>
  );
};

export default Board;
