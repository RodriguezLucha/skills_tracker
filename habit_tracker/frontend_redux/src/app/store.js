import { configureStore } from '@reduxjs/toolkit';
import monthlyCalenderInfo from '../features/monthlyCalenderInfo/monthlyCalenderInfoSlice';
import calenderSlice from '../features/calender/calenderSlice';

export default configureStore({
  reducer: {
    monthlyCalenderInfo: monthlyCalenderInfo,
    calender: calenderSlice
  },
});
