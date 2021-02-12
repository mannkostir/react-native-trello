import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MainTextInput from '../MainTextInput';

const AddColumn = ({
  handleSubmit,
}: {
  handleSubmit: (columnTitle: string) => void;
}) => {
  const [columnTitle, setColumnTitle] = useState('');

  return (
    <View style={styles.columnsSection}>
      <MainTextInput
        style={styles.column}
        onChangeText={(text) => setColumnTitle(text)}
        value={columnTitle}
      />
      <Button
        title="Add column"
        onPress={() => {
          handleSubmit(columnTitle);
          setColumnTitle('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columnsSection: {
    paddingHorizontal: 20,
  },
  column: {
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    fontSize: 17,
    marginBottom: 10,
  },
});

export default AddColumn;
