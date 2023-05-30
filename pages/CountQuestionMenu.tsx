import { View, Text } from 'react-native';
import React from 'react';
import { styled } from 'styled-components/native';
import { Slider } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';
import { selectQuiz, setSliderValue } from '../redux/slices/quizSlice';
import { RouterProps } from './Home';

export const CountQuestionMenu = ({ navigation }: RouterProps) => {
  const { sliderValue } = useSelector(selectQuiz);
  const dispatch = useAppDispatch();

  return (
    <>
      <CountContainer>
        <Title>Выберите количество вопросов</Title>
        <Title>Кол-во вопросов: {sliderValue}</Title>
        <Slider
          animateTransitions
          animationType="timing"
          maximumTrackTintColor="#ccc"
          maximumValue={50}
          minimumTrackTintColor="rgba(78, 78, 78, 0.4)"
          minimumValue={1}
          onValueChange={(value) => dispatch(setSliderValue(value))}
          orientation="horizontal"
          step={1}
          style={{ width: '99%', height: 200 }}
          thumbStyle={{ height: 25, width: 20 }}
          thumbTintColor="#547165"
          thumbTouchSize={{ width: 20, height: 20 }}
          trackStyle={{ height: 10, borderRadius: 20 }}
          value={sliderValue}
        />
      </CountContainer>
      <ButtonsContainer>
        <BackButton onPress={() => navigation.navigate('QuestionTypeMenu')}>
          <Text>👈🏻Prev</Text>
        </BackButton>
        <NextButton onPress={() => navigation.navigate('StackQuiz')}>
          <Text>Next👉🏻</Text>
        </NextButton>
      </ButtonsContainer>
    </>
  );
};

const CountContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
`;

const BackButton = styled.TouchableOpacity`
  height: 50px;
  width: 100px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: #2196f3;
`;

const NextButton = styled.TouchableOpacity`
  height: 50px;
  width: 100px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-left: 10px;
  background-color: #2196f3;
`;
