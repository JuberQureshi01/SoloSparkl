import { configureStore } from '@reduxjs/toolkit';
import userReducer from './serSlice';
import questReducer from './questSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    quests: questReducer,
  },
});

export default store;