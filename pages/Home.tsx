import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

import { Button, Text } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';

import { Carousel } from '../components/Carousel';

export interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const Home = ({ navigation }: RouterProps) => {
  // const dispatch = useAppDispatch();
  // const { sliderValue, handlerRequestQuiz } = useSelector(selectQuiz);

  // if (isLoading) {
  //   return <Text>loading...</Text>;
  // }
  // if (error) {
  //   return <Text>Error</Text>;
  // }

  return (
    <Container>
      <HeadTitle>React Quiz</HeadTitle>
      <Text style={{ textAlign: 'center', fontSize: 15, marginTop: -5, color: '#547165' }}>
        создавай любые тесты
      </Text>
      <Text>Выберите интересующую вас категорию:</Text>
      <Carousel navigation={navigation} />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const HeadTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  color: #547165;
`;
