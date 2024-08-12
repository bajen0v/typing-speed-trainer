import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomText } from '../utils';

interface TypingState {
  text: string;
  userInput: string;
  startTime: number | null;
  errors: number;
  wordsPerMinute: number;
}

const initialState: TypingState = {
  text: getRandomText([
    'This is a sample text for typing speed test.', 
    'Создать приложение "Typing Speed Trainer" на React, которое оценит скорость печати пользователя.',
    'Приложение должно предоставлять пользователю текст для ввода, показывать правильные и неправильные символы разным.']),
  userInput: '',
  startTime: null,
  errors: 0,
  wordsPerMinute: 0,
};

const rootSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    startTest(state) {
      state.startTime = Date.now();
      state.userInput = '';
      state.errors = 0;
      state.wordsPerMinute = 0;
    },
    updateUserInput(state, action: PayloadAction<string>) {
      state.userInput = action.payload;
      const textArray = state.text.split('');
      const inputArray = action.payload.split('');
      state.errors = inputArray.reduce((acc, char, index) => {
        return char !== textArray[index] ? acc + 1 : acc;
      }, 0);
      if (state.startTime) {
        const timeDifference = (Date.now() - state.startTime) / 1000 / 60;
        state.wordsPerMinute = Math.round((inputArray.length / 5) / timeDifference);
      }
    },
    resetTest(state) {
      state.userInput = '';
      state.startTime = null;
      state.errors = 0;
      state.wordsPerMinute = 0;
    },
  },
});

export const { startTest, updateUserInput, resetTest } = rootSlice.actions;
export default rootSlice.reducer;
