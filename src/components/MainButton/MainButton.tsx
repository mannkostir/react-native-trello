import React, {useState} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
} from 'react-native';

const MainButton = ({
  children,
  style,
  ...props
}: PressableProps & {children: string; style?: StyleProp<any>}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.button,
        isPressed ? styles.pressedButton : {},
        props.disabled ? styles.disabledButton : {},
        style,
      ]}
      onPressIn={(e) => {
        props.onPressIn && props.onPressIn(e);
        setIsPressed(true);
      }}
      onPressOut={(e) => {
        props.onPressOut && props.onPressOut(e);
        setIsPressed(false);
      }}
      {...props}>
      <Text style={[styles.buttonText]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#72A8BC',
    width: '60%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#151515',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  pressedButton: {
    backgroundColor: '#6798aa',
    shadowColor: 'transparent',
    elevation: 0,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0,
  },
  disabledButton: {
    backgroundColor: '#797f80',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0,
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
  },
});

export default MainButton;
