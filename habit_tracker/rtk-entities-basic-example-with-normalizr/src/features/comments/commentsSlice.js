import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchArticle } from "../articles/articlesSlice";

const commentsAdapter = createEntityAdapter();

export const slice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchArticle.fulfilled]: (state, action) => {
      commentsAdapter.upsertMany(state, action.payload.comments);
    }
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectCommentById,
  selectIds: selectCommentIds,
  selectEntities: selectCommentEntities,
  selectAll: selectAllComments,
  selectTotal: selectTotalComments
} = commentsAdapter.getSelectors(state => state.comments);
