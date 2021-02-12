import React, {useState} from 'react';
import {StyleSheet, TextInputProps, TextStyle} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const MainTextInput = ({
  style,
  ...props
}: TextInputProps & {style: TextStyle}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[
        styles.textInput,
        style,
        isFocused ? styles.textInputFocused : {},
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      selectionColor="#72A8BC"
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    minHeight: 30,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  textInputFocused: {
    borderWidth: 1,
    borderColor: '#72A8BC',
    borderRadius: 15,
  },
});

export default MainTextInput;
