import React from 'react';
import { styled } from 'styled-components/native';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { RouterProps } from './Home';
import { selectGame } from '../redux/slices/gameSlice';
import { useAppDispatch } from '../redux/store';
import {
  setCurrentQuestion,
  setAnswers,
  setCorrectAnswers,
  setCurrentQuestionIndex,
} from '../redux/slices/gameSlice';

import {
  setSliderValue,
  setCategoryId,
  setComplexity,
  setHandlerRequestQuiz,
  setQuestionType,
  setQuiz,
} from '../redux/slices/quizSlice';

export const QuizResults = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { correctAnswers } = useSelector(selectGame);

  const handleHome = () => {
    dispatch(setAnswers([]));
    dispatch(setCorrectAnswers(0));
    dispatch(setCurrentQuestionIndex(0));
    dispatch(
      setCurrentQuestion({
        category: '',
        type: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answers: [''],
      })
    );
    dispatch(setSliderValue(10));
    dispatch(setCategoryId(''));
    dispatch(setComplexity(''));
    dispatch(setQuestionType(''));
    dispatch(setHandlerRequestQuiz(false));
    dispatch(
      setQuiz({
        response_code: 0,
        results: [
          {
            category: '',
            type: '',
            difficulty: '',
            question: '',
            correct_answer: '',
            incorrect_answers: [''],
          },
        ],
      })
    );
    navigation.navigate('Home');
  };

  return (
    <Container>
      <HeadTitle>Результаты</HeadTitle>
      <PointsText>Количество очков: {correctAnswers}</PointsText>
      <ButtonsContainer>
        <BackButton onPress={handleHome}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Home</Text>
        </BackButton>
      </ButtonsContainer>
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

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  padding: 10px;
`;

const BackButton = styled.TouchableOpacity`
  height: 80px;
  width: 160px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: #71bfff;
`;

const PointsText = styled.Text`
  padding-left: 20px;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 10px;
`;
