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
    debugger;
    const response = await fetch(`calender/monthv2/${month}`);
    const data = await response.json();
    const normalized = normalize(data);
    console.log(normalized.entities);
    return normalized.entities;
  }
);

export const calenderAdapter = createEntityAdapter();

const initialState = calenderAdapter.getInitialState();

export const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCalenderByMonth.fulfilled, calenderAdapter.upsertMany);
  }
});

const { actions, reducer } = calenderSlice;
export const {} = actions;
export default reducer;
