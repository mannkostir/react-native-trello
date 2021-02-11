import React, {useMemo, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Board from '@/screens/Board';
import {NavigationContainer} from '@react-navigation/native';
import Column from '@/screens/Column';
import Auth from '@/screens/Auth';
import {MainNavigatorParamList} from '@/types/Navigation.types';
import CardDetails from '@/screens/CardDetails';
import BoardScreenTitle from '@/components/BoardScreenTitle';
import {RootState} from '@/store';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );

  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const isAuthenticated = useMemo(() => token, [token]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Board"
              // component={Board}
              initialParams={{isAddingColumn}}
              options={({route}) => ({
                headerTitle: (props) => (
                  <BoardScreenTitle
                    setIsAddingColumn={setIsAddingColumn}
                    isAddingColumn={isAddingColumn}
                    title="Board"
                  />
                ),
              })}>
              {(props) => (
                <Board
                  isAddingColumn={isAddingColumn}
                  setIsAddingColumn={setIsAddingColumn}
                />
              )}
            </Stack.Screen>
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
                title: route.params.title,
                headerStyle: {
                  backgroundColor: '#BFB393',
                },
                headerTitleAlign: 'left',
              })}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
