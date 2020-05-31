import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector
} from "@reduxjs/toolkit";
import fakeAPI from "../../services/fakeAPI";
import { normalize } from "normalizr";
import { articleEntity } from "../../schemas";

const articlesAdapter = createEntityAdapter();

export const fetchArticle = createAsyncThunk(
  "articles/fetchArticle",
  async id => {
    const data = await fakeAPI.articles.show(id);
    // normalize the data so reducers can responded to a predictable payload, in this case: `action.payload = { users: {}, articles: {}, comments: {} }`
    const normalized = normalize(data, articleEntity);
    return normalized.entities;
  }
);

export const slice = createSlice({
  name: "articles",
  initialState: articlesAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchArticle.fulfilled]: (state, action) => {
      articlesAdapter.upsertMany(state, action.payload.articles);
    }
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectArticleById,
  selectIds: selectArticleIds,
  selectEntities: selectArticleEntities,
  selectAll: selectAllArticles,
  selectTotal: selectTotalArticles
} = articlesAdapter.getSelectors(state => state.articles);

export const selectCommentsByArticleId = articleId =>
  createSelector(
    [
      state => selectArticleById(state, articleId), // select the current article
      state => state.comments.ids.map(id => state.comments.entities[id]) // this is the same as selectAllComments
    ],
    (article, comments) => {
      // return the comments for the given article only
      return Object.keys(comments)
        .map(c => comments[c])
        .filter(comment => article.comments.includes(comment.id));
    }
  );
