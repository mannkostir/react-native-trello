import {BoardScreenNavigation} from '@/types/navigationTypes';
import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MainText from '../MainText';

const ColumnsItem = ({
  title,
  id,
  navigation,
}: {
  title: string;
  id: number;
  navigation: BoardScreenNavigation;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={[styles.column, isPressed ? styles.columnPressed : {}]}>
      <Pressable
        onPress={() => {
          navigation.navigate('Column', {
            title,
            columnId: id,
          });
        }}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => {
          setIsPressed(false);
        }}>
        <MainText weight="Medium">{title}</MainText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e5e5e5',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 5,
    fontSize: 17,
  },
  columnPressed: {
    backgroundColor: 'rgb(226, 226, 226)',
  },
});

export default ColumnsItem;
