import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsByArticleId } from "./articlesSlice";
import { selectUserById, selectUserEntities } from "../users/usersSlice";

export function ArticleDisplay({ id }) {
  const article = useSelector(state => state.articles.entities[id]);
  const comments = useSelector(selectCommentsByArticleId(id));
  const author = useSelector(state => selectUserById(state, article.author));
  const users = useSelector(selectUserEntities);
  return (
    <div style={{ textAlign: "left" }}>
      <h3>{article.title}</h3>
      <small>By: {author.first_name}</small>
      <h5>Comments</h5>
      {comments.map(comment => (
        <div key={comment.id}>
          <div style={{ fontWeight: "bold", fontSize: 18 }}>
            {users[comment.commenter].first_name}
          </div>
          {comment.content}
        </div>
      ))}
      <div />
    </div>
  );
}
