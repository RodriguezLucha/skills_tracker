import {
    createSlice,
    createEntityAdapter
} from "@reduxjs/toolkit";
import {fetchCalenderByMonth} from "../monthlyCalenderInfo/monthlyCalenderInfoSlice";

export const dayAdapter = createEntityAdapter();

const initialState = dayAdapter.getInitialState();

export const daySlice = createSlice({
    name: "day",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCalenderByMonth.fulfilled]: (state, action) => {
            dayAdapter.upsertMany(state, action.payload.day);
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