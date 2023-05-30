import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import { RouterProps } from './Home';

import { setComplexity } from '../redux/slices/quizSlice';
import { RootState, useAppDispatch } from '../redux/store';

export const DifficultyMenu = ({ navigation }: RouterProps) => {
  const complexity = useSelector((state: RootState) => state.quiz.complexity);
  const dispatch = useAppDispatch();
  const difficulty = ['easy', 'medium', 'hard', ''];

  return (
    <DifficultyContainer>
      <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>
        Выберите сложность вашего теста:
      </Text>
      <EasyButton
        isSelected={complexity === 'easy'}
        onPress={() => dispatch(setComplexity('easy'))}>
        <Text>Easy 😌</Text>
      </EasyButton>
      <MediumButton
        isSelected={complexity === 'medium'}
        onPress={() => dispatch(setComplexity('medium'))}>
        <Text>Medium 🤓</Text>
      </MediumButton>
      <HardButton
        isSelected={complexity === 'hard'}
        onPress={() => dispatch(setComplexity('hard'))}>
        <Text>Hard 😈</Text>
      </HardButton>
      <AnyButton isSelected={complexity === ''} onPress={() => dispatch(setComplexity(''))}>
        <Text>Any Difficulty 🤔</Text>
      </AnyButton>
      <ButtonsContainer>
        <BackButton onPress={() => navigation.navigate('Home')}>
          <Text>👈🏻Prev</Text>
        </BackButton>
        <NextButton onPress={() => navigation.navigate('QuestionTypeMenu')}>
          <Text>Next👉🏻</Text>
        </NextButton>
      </ButtonsContainer>
    </DifficultyContainer>
  );
};

const DifficultyContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

export interface DifficultyButtonType {
  isSelected?: boolean;
}

const DifficultyButton = styled.TouchableOpacity<DifficultyButtonType>`
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
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

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
`;

const EasyButton = styled(DifficultyButton)`
  background-color: ${({ isSelected }) => (isSelected ? '#c6d3b7' : '#4CAF50')};
`;

const MediumButton = styled(DifficultyButton)`
  background-color: ${({ isSelected }) => (isSelected ? '#c6d3b7' : '#FFC107')};
`;

const HardButton = styled(DifficultyButton)`
  background-color: ${({ isSelected }) => (isSelected ? '#c6d3b7' : '#F44336')};
`;

const AnyButton = styled(DifficultyButton)`
  background-color: ${({ isSelected }) => (isSelected ? '#c6d3b7' : '#9E9E9E')};
`;
