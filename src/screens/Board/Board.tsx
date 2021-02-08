import Lists from '@/components/Columns/Columns';
import {Card, Column} from '@/types/Common.types';
import {BoardScreenNavigation} from '@/types/Navigation.types';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

const ListsItems: Column[] = [
  {
    id: 1,
    title: 'To Do',
    userId: 1,
  },
  {
    id: 2,
    title: 'In Progress',
    userId: 1,
  },
  {
    id: 3,
    title: 'Testing',
    userId: 1,
  },
  {
    id: 4,
    title: 'Done',
    userId: 1,
  },
];

const Cards: Card[] = [
  {
    title: 'First Item',
    id: 1,
    columnId: 1,
    description: 'nope',
    checked: false,
    commentsIds: [],
  },
  {
    title: 'Second Item',
    id: 2,
    columnId: 2,
    description: 'nope',
    checked: false,
    commentsIds: [],
  },
  {
    title: 'Third Item',
    id: 3,
    columnId: 3,
    description: 'nope',
    checked: false,
    commentsIds: [],
  },
  {
    title: 'Fourth Item',
    id: 4,
    columnId: 4,
    description: 'nope',
    checked: false,
    commentsIds: [],
  },
  {
    title: 'Fifth Item',
    id: 5,
    columnId: 5,
    description: 'nope',
    checked: false,
    commentsIds: [],
  },
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
