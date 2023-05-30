import React from 'react';
import { styled } from 'styled-components/native';
import { Alert, Text, View } from 'react-native';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { selectGame, setCorrectAnswers, setCurrentQuestionIndex } from '../redux/slices/gameSlice';
import { selectQuiz } from '../redux/slices/quizSlice';
import { RouterProps } from '../pages/Home';

export const QuizItem = ({ navigation }: RouterProps) => {
  const dispatch = useAppDispatch();
  const { correctAnswers, currentQuestionIndex } = useSelector(selectGame);
  const { quiz, sliderValue } = useSelector(selectQuiz);

  const currentQuestion = quiz.results[currentQuestionIndex];
  const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState(-1);

  const answers = React.useMemo(() => {
    if (!currentQuestion) {
      return [];
    }
    return [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(
      () => Math.random() - 0.5
    );
  }, [currentQuestion]);

  const handleNextQuestion = React.useCallback(
    (current: number) => {
      if (currentQuestionIndex < sliderValue - 1) {
        dispatch(setCurrentQuestionIndex(current + 1));
        setSelectedAnswerIndex(-1);
      } else if (currentQuestionIndex === sliderValue - 1) {
        navigation.navigate('QuizResults');
      }
    },
    [dispatch, currentQuestionIndex]
  );

  const checkQuestionsHandler = React.useCallback(
    (index: number, answer: string) => {
      if (selectedAnswerIndex !== -1) {
        return;
      }
      if (answer === currentQuestion.correct_answer) {
        dispatch(setCorrectAnswers(correctAnswers + 1));
      } else {
        Alert.alert(`Правильный ответ: ${currentQuestion.correct_answer}`);
      }
      setSelectedAnswerIndex(index);
    },
    [selectedAnswerIndex, currentQuestion, correctAnswers, dispatch]
  );

  const question = currentQuestion ? currentQuestion.question : '';
  return (
    <QuizItemContainer>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Title>
          {currentQuestionIndex + 1}/{sliderValue}
        </Title>
        <Title>Score: {correctAnswers}</Title>
      </View>
      <Title>
        {question
          .replace(/&quot;/g, '')
          .replace(/&#039;/g, '')
          .replace(/&eacute;/g, '')
          .replace(/&amp;/g, '')
          .replace(/&Uuml;/g, '')}
      </Title>

      <ButtonsContainer>
        {answers.map((item, index) => (
          <QuizButton
            key={item}
            disabled={selectedAnswerIndex !== -1}
            onPress={() => checkQuestionsHandler(index, item)}
            color={
              selectedAnswerIndex === index
                ? item === currentQuestion.correct_answer
                  ? '#00cc00'
                  : '#ff0000'
                : '#026767'
            }>
            <ButtonText>
              {item
                .replace(/&#039;/g, '')
                .replace(/&rsquo;/g, '')
                .replace(/&eacute;/g, '')
                .replace(/&ecirc;/g, '')
                .replace(/&amp;/g, '')
                .replace(/&euml;/g, '')}
            </ButtonText>
          </QuizButton>
        ))}
      </ButtonsContainer>
      <ButtonsContainerBottom>
        <BackButton onPress={() => handleNextQuestion(currentQuestionIndex)}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Далее</Text>
        </BackButton>
      </ButtonsContainerBottom>
    </QuizItemContainer>
  );
};

const ButtonsContainerBottom = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
`;

interface QuizButtonProps {
  color: string;
}

const QuizButton = styled.TouchableOpacity<QuizButtonProps>`
  width: 48%;
  height: 100px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: ${(props) => props.color};
`;

const QuizItemContainer = styled.View`
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

const ButtonsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
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
