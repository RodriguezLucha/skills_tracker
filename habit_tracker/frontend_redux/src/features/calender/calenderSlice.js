import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { calenderAPI } from "./calenderAPI";

// First, create the thunk
const fetchCalenerByMonth = createAsyncThunk(
  "users/fetchByIdStatus",
  async (month, thunkAPI) => {
    const response = await fetch(`calender/month/${month}`);
    return response.json.data;
  }
);

// Then, handle actions in your reducers:
const calenderSlice = createSlice({
  name: "calender",
  initialState: { entities: [], loading: "idle" },
  reducers: {
    
  }
});

const { actions, reducer } = calenderSlice;
export const { createPost, updatePost, deletePost } = actions

export default reducer;

// Later, dispatch the thunk as needed in the app
//dispatch(fetchCalenderByMonth('May'))
