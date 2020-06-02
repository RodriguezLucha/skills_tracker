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
      await response.json();
      return {day, status};
    }
);
export const updateDayNote = createAsyncThunk(
    "day/updateDayNote",
    async({id, note}, thunkAPI) => {
        const response = await fetch(
            `/calender/day/${id}/note?note=${note}`,
            {method: "POST"}
        );
        await response.json();
        return {id, note};
    }
)

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
        },
        [updateDayNote.fulfilled]: (state, action) => {
            let {id, note} = action.payload;
            state.entities[id].note = note;
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