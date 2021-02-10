import {authActions} from '@/store/auth';
import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(authActions.signIn({email, password}));
  };

  return (
    <View>
      <TextInput
        placeholder="Enter email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Enter password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignIn;
