import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';

const MainText = ({
  children,
  style,
  weight = 'Regular',
  ...props
}: TextProps & {
  children: string;
  style?: TextStyle;
  weight?: 'Regular' | 'Medium' | 'Bold';
}) => {
  return (
    <Text
      {...props}
      style={[
        styles.common,
        weight === 'Regular'
          ? styles.regularText
          : weight === 'Medium'
          ? styles.mediumText
          : styles.boldText,
        style,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  common: {
    fontSize: 15,
    lineHeight: 20,
  },
  regularText: {
    fontFamily: 'SFUITEXT-Regular',
  },
  mediumText: {
    fontFamily: 'SFUITEXT-Medium',
  },
  boldText: {
    fontFamily: 'SFUITEXT-Bold',
  },
});

export default MainText;
