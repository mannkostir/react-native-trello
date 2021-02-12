import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import commonStyles from '@/styles/common.styles';
import {AuthToken} from '@/types/Common.types';
import React, {useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import MainText from '../MainText';

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
      <MainText style={[styles.titleText]}>{title}</MainText>
      <View style={styles.titleButton}>
        <TouchableOpacity
          onPress={() => setIsAddingColumn((isAdding) => !isAdding)}>
          <Text style={styles.titleIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  titleButton: {
    position: 'absolute',
    marginLeft: 20,
    right: 20,
  },
  titleIcon: {
    fontSize: 30,
    color: '#72A8BC',
  },
  titleText: {},
});

export default BoardScreenTitle;
