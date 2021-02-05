import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Board from '@/screens/Board';
import {NavigationContainer} from '@react-navigation/native';
import List from '@/screens/List';
import Auth from '@/screens/Auth';
import {MainNavigatorParamList} from '@/types/Navigation.types';
import PrayerDetails from '@/screens/PrayerDetails';

const Stack = createStackNavigator<MainNavigatorParamList>();

const isAuthenticated = true;

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? null : <Stack.Screen name="Auth" component={Auth} />}
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen
          name="List"
          component={List}
          options={({route}) => ({title: route.params.title})}
        />
        <Stack.Screen
          name="PrayerDetails"
          component={PrayerDetails}
          options={({route}) => ({title: route.params.cardInfo.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
