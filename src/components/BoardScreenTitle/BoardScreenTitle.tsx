import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import {AuthToken} from '@/types/Common.types';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const BoardScreenTitle = ({
  title,
  setIsAddingColumn,
}: {
  title: string;
  setIsAddingColumn: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingColumn: boolean;
}) => {
  return (
    <View style={styles.titleContainer}>
      <Text>{title}</Text>
      <TouchableOpacity
        onPress={() => setIsAddingColumn((isAdding) => !isAdding)}>
        <Text style={styles.titleIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginLeft: 10,
    fontSize: 25,
  },
});

export default BoardScreenTitle;
