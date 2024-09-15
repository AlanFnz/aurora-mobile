import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/index';
import { performSignIn } from '@store/authSlice';
import { Container, Input, SignInButton, SignInText, Title } from './styles';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSignIn = () => {
    dispatch(performSignIn(username, password));
  };

  return (
    <Container>
      <Title>Login Screen</Title>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <SignInButton onPress={handleSignIn}>
        <SignInText>Sign In</SignInText>
      </SignInButton>
    </Container>
  );
};

export default LoginScreen;
