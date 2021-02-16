import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SignUp from '@/navigators/AuthNavigator/screens/SignUp';
import SignIn from '@/navigators/AuthNavigator/screens/SignIn';

const TopTab = createMaterialTopTabNavigator();

// Passing functions as children to render is only a temporarily thing, just to make sure everything works
// Also just was too lazy to set up Context
// These functions will be eliminated once redux will come to the rescue

const AuthNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Sign Up">{(props) => <SignUp />}</TopTab.Screen>
      <TopTab.Screen name="Sign In">{(props) => <SignIn />}</TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default AuthNavigator;
