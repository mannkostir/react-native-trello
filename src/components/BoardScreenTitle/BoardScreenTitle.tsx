import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const BoardScreenTitle = ({title}: {title: string}) => {
  return (
    <View style={styles.titleContainer}>
      <Text>{title}</Text>
      <TouchableOpacity>
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
