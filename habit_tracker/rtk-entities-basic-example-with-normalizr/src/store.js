import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import commentsReducer from "./features/comments/commentsSlice";
import articlesReducer from "./features/articles/articlesSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    comments: commentsReducer,
    articles: articlesReducer
  }
});
