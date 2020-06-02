import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk
} from "@reduxjs/toolkit";
import {fetchCalenderByMonth} from "../monthlyCalenderInfo/monthlyCalenderInfoSlice";

export const calenderAdapter = createEntityAdapter();

const initialState = calenderAdapter.getInitialState();

export const addNewCalender = createAsyncThunk(
    "calender/addNewCalender",
    async (name, thunkApi) => {
        const requestOptions = {
            method: "POST",
        };
        const response = await fetch(
            `/calender?name=${name}&year=2020`,
            requestOptions
        );
        return response;
    }
);

export const calenderSlice = createSlice({
    name: "calender",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCalenderByMonth.fulfilled]: (state, action) => {
            calenderAdapter.upsertMany(state, action.payload.calender);
        },
        [addNewCalender.fulfilled]: (state, action) => {
            calenderAdapter.upsertMany(state, action.payload.calender);
        }

    },
});

export const {
    selectById: selectCalenderById,
    selectIds: selectCalenderIds,
    selectEntities: selectCalenderEntities,
    selectAll: selectAllCalenders,
    selectTotal: selectTotalCalenders 
} = calenderAdapter.getSelectors(state => state.calender);

const { reducer } = calenderSlice;
export default reducer;