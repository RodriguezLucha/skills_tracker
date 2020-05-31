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
    return normalized.entities;
  }
);

export const calenderInfoAdapter = createEntityAdapter();

const initialState = calenderInfoAdapter.getInitialState();

export const monthlyCalenderInfoSlice = createSlice({
  name: "monthlyCalenderInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCalenderByMonth.fulfilled]: (state, action) => {
      calenderInfoAdapter.upsertMany(state, action.payload.monthlyCalenderInfo);
    }
  },
});

export const { 
  selectById: selectCalenderInfoById,
  selectIds: selectCalenderInfoIds,
  selectEntities: selectCalenderInfoEntities,
  selectAll: selectAllCalenderInfos,
  selectTotal: selectTotalCalenderInfos } = calenderInfoAdapter.getSelectors(state => state.monthlyCalenderInfo);

const { reducer } = monthlyCalenderInfoSlice;
export default reducer;
