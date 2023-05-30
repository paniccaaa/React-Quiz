import React from 'react';
import { styled } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import { useQuery } from 'react-query';

import { useAppDispatch } from '../redux/store';
import { selectQuiz, setQuiz, setHandlerRequestQuiz } from '../redux/slices/quizSlice';
import { categories } from '../utils/categories';
import { RouterProps } from './Home';

export const StackQuiz = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { sliderValue, categoryId, complexity, questionType, handlerRequestQuiz, quiz } =
    useSelector(selectQuiz);
  const categoryName = categories.filter((obj) => obj.id === categoryId);

  const { data } = useQuery(['quizData'], () =>
    fetch(
      `https://opentdb.com/api.php?amount=${sliderValue}&category=${categoryId}&difficulty=${complexity}&type=${questionType}`
    ).then((res) => res.json())
  );

  let complexityValue: string = '';
  if (complexity === 'easy') {
    complexityValue = complexity + '😌';
  } else if (complexity === 'medium') {
    complexityValue = complexity + '🤓';
  } else if (complexity === 'hard') {
    complexityValue = complexity + '😈';
  } else {
    complexityValue = complexity + 'Any' + '🤔';
  }

  let typeValue = '';
  if (questionType === 'boolean') {
    typeValue = 'True/false';
  } else if (questionType === 'multiple') {
    typeValue = 'Multiple Choice';
  } else {
    typeValue = 'Any types';
  }

  const handlerStartButton = () => {
    navigation.navigate('QuizItem');
  };

  React.useEffect(() => {
    if (data) {
      dispatch(setQuiz(data));
      console.log(data);
    }
  }, [handlerRequestQuiz, data]);

  return (
    <StackQuizContainer>
      <Title>Выбранные параметры</Title>
      <StackText>Кол-во вопросов: {sliderValue}</StackText>
      <StackText>Категория: {categoryName[0].name}</StackText>
      <ImageBlock source={{ uri: categoryName[0].url }} />
      <StackText>Сложность: {complexityValue}</StackText>
      <StackText>Тип вопросов: {typeValue}</StackText>
      {data && (
        <ButtonsContainer>
          <BackButton onPress={handlerStartButton}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Начать</Text>
          </BackButton>
        </ButtonsContainer>
      )}
    </StackQuizContainer>
  );
};

const StackQuizContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const StackText = styled.Text`
  padding-left: 20px;
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ImageBlock = styled.Image`
  border-radius: 10px;
  width: 200px;
  margin-left: 20px;
  height: 200px;
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
