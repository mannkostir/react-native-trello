import ListNavigator from '@/navigators/ListNavigator';
import {ColumnScreenRoute} from '@/types/Navigation.types';
import {useRoute} from '@react-navigation/native';
import React from 'react';

const List = () => {
  const route = useRoute<ColumnScreenRoute>();

  return <ListNavigator cards={route.params.cards} />;
};

export default List;
