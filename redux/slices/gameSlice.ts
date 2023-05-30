import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { Result } from './quizSlice';

interface GameSliceState {
  currentQuestionIndex: number;
  correctAnswers: number;
  currentQuestion: Result;
  answers: string[];
}

const initialState: GameSliceState = {
  currentQuestionIndex: 0,
  correctAnswers: 0,
  currentQuestion: {
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [''],
  },
  answers: [],
};

const gameSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    setCorrectAnswers: (state, action: PayloadAction<number>) => {
      state.correctAnswers = action.payload;
    },
    setAnswers: (state, action: PayloadAction<string[]>) => {
      state.answers = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<Result>) => {
      state.currentQuestion = action.payload;
    },
  },
});

export const selectGame = (state: RootState) => state.game;
export const { setCurrentQuestionIndex, setCorrectAnswers, setAnswers, setCurrentQuestion } =
  gameSlice.actions;
export default gameSlice.reducer;
