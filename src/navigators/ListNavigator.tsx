import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Prayers from '@/screens/Cards';
import {Card} from '@/types/Common.types';
import Subscribed from '@/screens/Subscribed';

const TopTab = createMaterialTopTabNavigator();

// Passing functions as children to render is only a temporarily thing, just to make sure everything works
// Also just was too lazy to set up Context
// These functions will be eliminated once redux will come to the rescue

const ListNavigator = ({cards}: {cards: Card[]}) => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Cards">
        {(props) => <Prayers {...props} cards={cards} />}
      </TopTab.Screen>
      <TopTab.Screen name="Subscribed">
        {(props) => (
          <Subscribed {...props} subscribed={cards.filter((card) => false)} />
        )}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default ListNavigator;
