import {RootState} from '@/store';
import {authActions} from '@/store/auth';
import commonStyles from '@/styles/common.styles';
import React, {useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(authActions.signUp({email, password, name}));
  };

  return (
    <View>
      <TextInput
        style={commonStyles.textInput}
        placeholder="Enter name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={commonStyles.textInput}
        placeholder="Enter email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={commonStyles.textInput}
        placeholder="Enter password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUp;
