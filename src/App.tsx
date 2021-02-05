/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return <MainNavigator />;
};

const styles = StyleSheet.create({});

export default App;
