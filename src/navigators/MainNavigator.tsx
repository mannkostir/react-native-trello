import React, {useMemo, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Board from '@/screens/Board';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Column from '@/screens/Column';
import Auth from '@/screens/Auth';
import {MainNavigatorParamList} from '@/types/Navigation.types';
import CardDetails from '@/screens/CardDetails';
import BoardScreenTitle from '@/components/BoardScreenTitle';
import {RootState} from '@/store';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import MainText from '@/components/MainText';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.token || null,
  );

  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const [isFullHeightDescription, setIsFullHeightDescription] = useState(false);

  const isAuthenticated = useMemo(() => token, [token]);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#ffffff',
          text: '#514D47',
          border: '#E5E5E5',
          card: '#ffffff',
          primary: '#72A8BC',
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {height: 60},
        }}>
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
                  height: isFullHeightDescription ? '100%' : 120,
                },
                headerBackTitleVisible: false,
                headerLeftContainerStyle: {
                  width: 10,
                  justifyContent: 'flex-start',
                },
                headerTintColor: '#fff',
                headerTitle: (props) => (
                  <View style={{marginLeft: -60, marginTop: 30}}>
                    {isFullHeightDescription ? (
                      <ScrollView>
                        <MainText
                          style={{color: '#fff', lineHeight: 24}}
                          onPress={() =>
                            setIsFullHeightDescription(
                              (isFullHeight) => !isFullHeight,
                            )
                          }>
                          {route.params.title}
                        </MainText>
                        <TouchableOpacity
                          style={{
                            alignSelf: 'center',
                            marginTop: 30,
                          }}
                          onPress={() => setIsFullHeightDescription(false)}>
                          <Text style={{fontSize: 34, color: '#fff'}}>X</Text>
                        </TouchableOpacity>
                      </ScrollView>
                    ) : (
                      <MainText
                        style={{color: '#fff', lineHeight: 24, flex: 1}}
                        numberOfLines={2}
                        onPress={() =>
                          setIsFullHeightDescription(
                            (isFullHeight) => !isFullHeight,
                          )
                        }>
                        {route.params.title}
                      </MainText>
                    )}
                  </View>
                ),
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
