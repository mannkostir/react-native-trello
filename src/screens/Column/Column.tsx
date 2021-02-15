import ListNavigator from '@/navigators/ListNavigator';
import {ColumnScreenRoute} from '@/types/navigationTypes';
import {useRoute} from '@react-navigation/native';
import React from 'react';

const Column = () => {
  const route = useRoute<ColumnScreenRoute>();

  return <ListNavigator columnId={route.params.columnId} />;
};

export default Column;
