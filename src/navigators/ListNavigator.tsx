import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Prayers from '@/screens/Prayers';
import SubscribedPrayers from '@/screens/SubscribedPrayers';
import {Prayer} from '@/types/Common.types';

const TopTab = createMaterialTopTabNavigator();

// Passing functions as children to render is only a temporarily thing, just to make sure everything works
// Also just was too lazy to set up Context
// These functions will be eliminated once redux will come to the rescue

const ListNavigator = ({cards}: {cards: Prayer[]}) => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Prayers">
        {(props) => <Prayers {...props} cards={cards} />}
      </TopTab.Screen>
      <TopTab.Screen name="Subscribed">
        {(props) => (
          <SubscribedPrayers
            {...props}
            subscribedPrayers={cards.filter((card) => card.subscribed.length)}
          />
        )}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default ListNavigator;
