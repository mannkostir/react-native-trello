import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import MainButton from '../MainButton';
import MainTextInput from '../MainTextInput';

const AddColumn = ({
  handleSubmit,
}: {
  handleSubmit: (columnTitle: string) => void;
}) => {
  const [columnTitle, setColumnTitle] = useState('');

  return (
    <View style={styles.container}>
      <MainTextInput
        style={styles.column}
        onChangeText={(text) => setColumnTitle(text)}
        value={columnTitle}
      />
      <MainButton
        onPress={() => {
          handleSubmit(columnTitle);
          setColumnTitle('');
        }}>
        Add Column
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  column: {},
});

export default AddColumn;
