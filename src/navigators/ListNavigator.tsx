import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Cards from '@/screens/Cards';
import {Card} from '@/types/commonTypes';
import Subscribed from '@/screens/Subscribed';
import {useRoute} from '@react-navigation/native';
import {ColumnScreenRoute} from '@/types/navigationTypes';

const TopTab = createMaterialTopTabNavigator();

const ListNavigator = () => {
  const route = useRoute<ColumnScreenRoute>();

  const columnId = route.params.columnId;

  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#72A8BC',
        inactiveTintColor: '#C8C8C8',
      }}>
      <TopTab.Screen name="Cards">
        {(props) => <Cards {...props} currentColumnId={columnId} />}
      </TopTab.Screen>
      <TopTab.Screen name="Subscribed">
        {(props) => (
          <Subscribed {...props} currentColumnId={columnId} subscribed={[]} />
        )}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default ListNavigator;
