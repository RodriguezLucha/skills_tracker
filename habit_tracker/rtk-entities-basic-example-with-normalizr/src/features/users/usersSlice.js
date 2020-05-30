import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchArticle } from "../articles/articlesSlice";

const usersAdapter = createEntityAdapter();

export const slice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      usersAdapter.upsertMany(state, action.payload.users);
    });
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers
} = usersAdapter.getSelectors(state => state.users);
