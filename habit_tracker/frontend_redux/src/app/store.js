import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import calenderReducer from '../features/calender/calenderSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    calender: calenderReducer,
  },
});
