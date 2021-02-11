import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const AddColumn = ({
  handleSubmit,
}: {
  handleSubmit: (columnTitle: string) => void;
}) => {
  const [columnTitle, setColumnTitle] = useState('');

  return (
    <View>
      <TextInput onChangeText={(text) => setColumnTitle(text)} />
      <Button title="Add column" onPress={() => handleSubmit(columnTitle)} />
    </View>
  );
};

export default AddColumn;
