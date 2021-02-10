import {RootState} from '@/store';
import {columnsActions} from '@/store/columns';
import {AuthToken} from '@/types/Common.types';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const BoardScreenTitle = ({
  title,
  token,
  dispatch,
}: {
  title: string;
  token: AuthToken;
  dispatch: React.Dispatch<any>;
}) => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const [columnName, setColumnName] = useState('');

  const addColumn = () => {
    if (columnName) {
      dispatch(
        columnsActions.createColumn({
          columnData: {title: columnName, description: ''},
          token,
        }),
      );
    }

    setIsAddingColumn(false);
  };
  return (
    <View style={styles.titleContainer}>
      {isAddingColumn ? (
        <>
          <TextInput
            placeholder="Name"
            onChangeText={(text) => setColumnName(text)}
          />
          <TouchableOpacity onPress={addColumn}>
            <Text style={styles.titleIcon}>+</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>{title}</Text>
          <TouchableOpacity
            onPress={() => setIsAddingColumn((isAdding) => !isAdding)}>
            <Text style={styles.titleIcon}>+</Text>
          </TouchableOpacity>
        </>
      )}
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
