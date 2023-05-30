import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type Result = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
export interface Quiz {
  response_code: number;
  results: Result[];
}

interface QuizSliceState {
  quiz: Quiz;
  sliderValue: number;
  handlerRequestQuiz: boolean;
  categoryId: number | string;
  complexity: string;
  questionType: string;
}

const initialState: QuizSliceState = {
  handlerRequestQuiz: false,
  quiz: {
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
  },
  sliderValue: 10,
  categoryId: '',
  complexity: '',
  questionType: '',
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setHandlerRequestQuiz: (state, action: PayloadAction<boolean>) => {
      state.handlerRequestQuiz = action.payload;
    },
    setQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quiz = action.payload;
    },
    setSliderValue: (state, action: PayloadAction<number>) => {
      state.sliderValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number | string>) => {
      state.categoryId = action.payload;
    },
    setComplexity: (state, action: PayloadAction<string>) => {
      state.complexity = action.payload;
    },
    setQuestionType: (state, action: PayloadAction<string>) => {
      state.questionType = action.payload;
    },
  },
});

export const selectQuiz = (state: RootState) => state.quiz;
export const {
  setQuestionType,
  setComplexity,
  setQuiz,
  setSliderValue,
  setHandlerRequestQuiz,
  setCategoryId,
} = quizSlice.actions;
export default quizSlice.reducer;
