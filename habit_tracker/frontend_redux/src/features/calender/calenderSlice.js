import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import {monthlyCalenderInfo} from "../../schemas";

export const fetchCalenderByMonth = createAsyncThunk(
  "calender/fetchByMonth",
  async (month, thunkAPI) => {
    const response = await fetch(`calender/monthv2/${month}`);
    const data = await response.json();
    const normalized = normalize(data, monthlyCalenderInfo);
    console.log(normalized.entities);
    return normalized.entities;
  }
);

export const calenderAdapter = createEntityAdapter();

const initialState = calenderAdapter.getInitialState();

//TODO: builder vs other syntax
export const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCalenderByMonth.fulfilled]: (state, action) => {
      // Handle the fetch result by inserting the articles here
      debugger;
      calenderAdapter.upsertMany(state, action.payload.monthlyCalenderInfo);
    }
  },
  // extraReducers: builder => {
  //   builder.addCase(fetchCalenderByMonth.fulfilled, calenderAdapter.upsertMany);
  // }
});

// Rename the exports for readability in component usage
export const { 
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers } = calenderAdapter.getSelectors(state => state.monthlyCalenderInfo);
const { actions, reducer } = calenderSlice;
export const {} = actions;
export default reducer;
