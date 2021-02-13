import MainButton from '@/components/MainButton';
import MainText from '@/components/MainText';
import MainTextInput from '@/components/MainTextInput';
import {RootState} from '@/store';
import {authActions} from '@/store/auth';
import commonStyles from '@/styles/common.styles';
import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const authState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(authActions.signIn({email, password}));
  };

  return (
    <View style={styles.container}>
      {authState.error ? (
        <MainText style={styles.errorMessage}>{authState.error}</MainText>
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
        disabled={authState.isLoading}
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
