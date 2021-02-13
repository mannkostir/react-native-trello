import React from 'react';
import {Pressable, Text, View} from 'react-native';

export const LeftActions = ({
  handleDeletePress,
}: {
  handleDeletePress: () => void;
}) => {
  return (
    <View
      style={{
        flex: 0.25,
        flexDirection: 'row',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <Pressable
        onPress={handleDeletePress}
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: '#AC5253',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff'}}>Delete</Text>
      </Pressable>
    </View>
  );
};

export const RightActions = ({
  handleEditPress,
}: {
  handleEditPress: () => void;
}) => {
  return (
    <View
      style={{
        flex: 0.25,
        flexDirection: 'row',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <Pressable
        onPress={handleEditPress}
        style={{
          flex: 1,
          paddingHorizontal: 10,
          backgroundColor: '#72A8BC',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff'}}>Edit</Text>
      </Pressable>
    </View>
  );
};
