import MainButton from '@/components/MainButton';
import MainText from '@/components/MainText';
import MainTextInput from '@/components/MainTextInput';
import {RootState} from '@/store';
import {authActions, useAuthSelector} from '@/store/auth';
import commonStyles from '@/styles/commonStyles';
import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const {isAuthLoading, authError} = useAuthSelector();

  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(authActions.signUp({email, password, name}));
  };

  return (
    <View style={styles.container}>
      {authError ? (
        <MainText style={styles.errorMessage}>{authError}</MainText>
      ) : null}
      <MainTextInput
        style={commonStyles.textInput}
        placeholder="Enter name"
        autoCapitalize="none"
        onChangeText={(text) => setName(text)}
      />
      <MainTextInput
        style={commonStyles.textInput}
        placeholder="Enter email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <MainTextInput
        style={commonStyles.textInput}
        placeholder="Enter password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <MainButton
        disabled={isAuthLoading}
        style={styles.submitButton}
        onPress={handleSignUp}>
        Sign Up
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  submitButton: {
    marginTop: 10,
    width: 100,
  },
  errorMessage: {
    color: '#AC5253',
  },
});

export default SignUp;
