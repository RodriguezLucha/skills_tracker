import {
    createSlice,
    createEntityAdapter
} from "@reduxjs/toolkit";
import {fetchCalenderByMonth} from "../monthlyCalenderInfo/monthlyCalenderInfoSlice";

export const calenderAdapter = createEntityAdapter();

const initialState = calenderAdapter.getInitialState();

export const calenderSlice = createSlice({
    name: "calender",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCalenderByMonth.fulfilled]: (state, action) => {
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