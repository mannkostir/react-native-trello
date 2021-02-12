import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
