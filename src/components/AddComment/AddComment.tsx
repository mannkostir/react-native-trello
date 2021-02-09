import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const AddComment = () => {
  return (
    <View>
      <TextInput placeholder="Add a comment..." />
    </View>
  );
};

export default AddComment;
