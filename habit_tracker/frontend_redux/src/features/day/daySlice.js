import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk
} from "@reduxjs/toolkit";
import {fetchCalenderByMonth} from "../monthlyCalenderInfo/monthlyCalenderInfoSlice";

export const dayAdapter = createEntityAdapter();

const initialState = dayAdapter.getInitialState();

 export const updateDayStatus = createAsyncThunk(
    "day/updateDayStatus",
    async ({day, status}, thunkAPI) => {
      const requestOptions = { method: "POST"};
      const response = await fetch(
          `/calender/day/${day}/status?status=${status}`,
          requestOptions
      );
      const data = await response.json();
      return {day, status};
    }
  );

export const daySlice = createSlice({
    name: "day",
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchCalenderByMonth.fulfilled]: (state, action) => {
            dayAdapter.upsertMany(state, action.payload.day);
        },
        [updateDayStatus.fulfilled]: (state, action) => {
            let {day, status} = action.payload;
            state.entities[day].status = status;
        }
    },
});

export const {
    selectById: selectDayById,
    selectIds: selectDayIds,
    selectEntities: selectDayEntities,
    selectAll: selectAllDays,
    selectTotal: selectTotalDays 
} = dayAdapter.getSelectors(state => state.day);

const { reducer } = daySlice;
export default reducer;