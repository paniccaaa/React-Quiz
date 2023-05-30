import { configureStore } from '@reduxjs/toolkit';
import quiz from './slices/quizSlice';
import { useDispatch } from 'react-redux';
import game from './slices/gameSlice';
export const store = configureStore({
  reducer: {
    quiz,
    game,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
