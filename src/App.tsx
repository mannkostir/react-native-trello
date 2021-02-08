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

const App = () => {
  return (
    <StoreProvider>
      <MainNavigator />
    </StoreProvider>
  );
};

export default App;
