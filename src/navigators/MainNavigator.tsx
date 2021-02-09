import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Board from '@/screens/Board';
import {NavigationContainer} from '@react-navigation/native';
import Column from '@/screens/Column';
import Auth from '@/screens/Auth';
import {MainNavigatorParamList} from '@/types/Navigation.types';
import CardDetails from '@/screens/CardDetails';

const Stack = createStackNavigator<MainNavigatorParamList>();

const isAuthenticated = true;

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        {isAuthenticated ? null : <Stack.Screen name="Auth" component={Auth} />}
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen
          name="Column"
          component={Column}
          options={({route}) => ({
            title: route.params.title,
          })}
        />
        <Stack.Screen
          name="CardDetails"
          component={CardDetails}
          options={({route}) => ({
            title: route.params.cardInfo.title,
            headerStyle: {
              backgroundColor: '#BFB393',
            },
            headerTitleAlign: 'left',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
