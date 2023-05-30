import {
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import React from 'react';
import { Text, ActivityIndicator, Button, View, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { FIREBASE_AUTH } from '../FirebaseConfig';

export const Auth: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);

  const auth = FIREBASE_AUTH;
  const height = useHeaderHeight();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      alert('Check yout emails!');
    } catch (error) {
      alert('Please tap "Create Account"');
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('ожидается 6 символов в пароле');
    } finally {
      setLoading(false);
    }
  };

  const signInAnonym = async (auth: any) => {
    setLoading(true);
    try {
      const response = await signInAnonymously(auth);
    } catch (error) {
      alert('Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const clickRegisterHandler = () => {
    setIsLogin(false);
    setIsRegister(!isRegister);
  };

  const clickLoginHandler = () => {
    setIsRegister(false);
    setIsLogin(!isLogin);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height + 30}
      style={{ flex: 1 }}
      behavior="padding">
      <AuthView>
        <View style={{ marginTop: -200, marginBottom: 220 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 30, color: '#547165' }}>
            React Quiz
          </Text>
          <Text style={{ fontWeight: '500', textAlign: 'center', fontSize: 18, color: '#547165' }}>
            лучшие тесты во вселенной
          </Text>
        </View>

        <View style={{ marginBottom: -300 }}>
          <TopButtonView>
            <ButtonContainer
              style={{ backgroundColor: isLogin ? 'rgba(78, 78, 78, 0.4)' : '#cce3de' }}
              onPress={clickLoginHandler}>
              <ButtonText>Login</ButtonText>
            </ButtonContainer>

            <ButtonContainer
              style={{ backgroundColor: isRegister ? 'rgba(78, 78, 78, 0.4)' : '#cce3de' }}
              onPress={clickRegisterHandler}>
              <ButtonText>Register</ButtonText>
            </ButtonContainer>
          </TopButtonView>

          <InputView>
            <TextInput
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text: string) => setEmail(text)}
            />
            <TextInput
              secureTextEntry
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text: string) => setPassword(text)}
            />
          </InputView>

          {loading ? (
            <ActivityIndicator size="large" color="#0077b6" />
          ) : (
            <>
              {isLogin && <Button color="black" title="Login" onPress={signIn} />}
              {isRegister && (
                <Button color="black" title="Create Account" onPress={createAccount} />
              )}
              <Button color="black" title="Continue as Guest" onPress={() => signInAnonym(auth)} />
            </>
          )}
        </View>
      </AuthView>
    </KeyboardAvoidingView>
  );
};

const AuthView = styled.View`
  flex: 1;
  background-color: #eaf4f4;
  justify-content: center;
`;

const InputView = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;

const TextInput = styled.TextInput`
  margin-top: 4px;
  margin-bottom: 4px;
  height: 50px;
  border-width: 1px;
  border-radius: 4px;
  padding: 10px;
  color: #547165;
  background-color: #f6fff8;
`;

const TopButtonView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
  margin-right: 15px;
  border-radius: 7px;
  border-width: 1px;
  height: 40px;
  width: 25%;
  align-items: center;
  justify-content: center;
  background-color: #cce3de;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;
