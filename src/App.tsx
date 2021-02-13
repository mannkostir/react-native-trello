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
import MainNavigator from './navigators/MainNavigator';
import StoreProvider from './store';
import {Platform, StatusBar, View, ViewComponent} from 'react-native';

// import {LogBox} from 'react-native';

// LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const App = () => {
  return (
    <StoreProvider>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 18,
        }}>
        <MainNavigator />
      </View>
    </StoreProvider>
  );
};

export default App;
