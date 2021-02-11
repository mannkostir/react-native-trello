import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const AddColumn = ({
  handleSubmit,
}: {
  handleSubmit: (columnTitle: string) => void;
}) => {
  const [columnTitle, setColumnTitle] = useState('');

  return (
    <View style={styles.columnsSection}>
      <TextInput
        style={styles.column}
        onChangeText={(text) => setColumnTitle(text)}
      />
      <Button title="Add column" onPress={() => handleSubmit(columnTitle)} />
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
