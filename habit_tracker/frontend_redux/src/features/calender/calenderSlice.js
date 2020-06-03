import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk
} from "@reduxjs/toolkit";
import {normalize} from "normalizr";
import {calender} from "../../schemas";
import {fetchCalenderByMonth, calenderInfoAdapter} from "../monthlyCalenderInfo/monthlyCalenderInfoSlice";

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

export const deleteCalender = createAsyncThunk(
    "calender/deleteCalender",
    async (id, thunkApi) => {
        const requestOptions = {
            method: "DELETE"
        };
        const response = await fetch(
            `/calender/${id}`,
            requestOptions
        );
        const data = await response.json();
        return data;
    }
)

export const calenderSlice = createSlice({
    name: "calender",
    initialState,
    reducers: {},
    extraReducers: {
        [addNewCalender.fulfilled]: (state, action) => {
  
        },
        [fetchCalenderByMonth.fulfilled]: (state, action) => {
            calenderAdapter.upsertMany(state, action.payload.calender);
        },
        [deleteCalender.fulfilled]: (state, action) => {

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