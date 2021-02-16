import React, {MutableRefObject, useEffect, useState} from 'react';
import {StyleSheet, TextInputProps, TextStyle} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const MainTextInput = ({
  style,
  ...props
}: TextInputProps & {style?: TextStyle}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

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
      value={props.value || value}
      onChangeText={(text) => {
        props.onChangeText && props.onChangeText(text);
        setValue(text);
      }}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    minHeight: 30,
    marginVertical: 10,
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#E5E5E5',
  },
  textInputFocused: {
    borderWidth: 1,
    borderColor: '#72A8BC',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    minHeight: 30,
  },
});

export default MainTextInput;
