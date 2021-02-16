import MainButton from '@/components/MainButton';
import MainText from '@/components/MainText';
import MainTextInput from '@/components/MainTextInput';
import {RootState} from '@/store';
import {authActions, useAuthSelector} from '@/store/auth';
import commonStyles from '@/styles/commonStyles';
import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const {isAuthLoading, authError} = useAuthSelector();

  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(authActions.signIn({email, password}));
  };

  return (
    <View style={styles.container}>
      {authError ? (
        <MainText style={styles.errorMessage}>{authError}</MainText>
      ) : null}
      <MainTextInput
        style={commonStyles.textInput}
        autoCapitalize="none"
        placeholder="Enter email"
        onChangeText={(text) => setEmail(text)}
      />
      <MainTextInput
        style={commonStyles.textInput}
        autoCapitalize="none"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <MainButton
        disabled={isAuthLoading}
        style={styles.submitButton}
        onPress={handleSignIn}>
        Sign In
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

export default SignIn;
