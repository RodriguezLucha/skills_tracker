import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from "@reduxjs/toolkit";

export const fetchCalenderByMonth = createAsyncThunk(
  "calender/fetchByMonth",
  async (month, thunkAPI) => {
    const response = await fetch(`calender/month/${month}`);
    debugger;
    return response.json.data;
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
