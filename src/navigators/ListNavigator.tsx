import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Cards from '@/screens/Cards';
import {Card} from '@/types/Common.types';
import Subscribed from '@/screens/Subscribed';

const TopTab = createMaterialTopTabNavigator();

const ListNavigator = ({columnId}: {columnId: number}) => {
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
