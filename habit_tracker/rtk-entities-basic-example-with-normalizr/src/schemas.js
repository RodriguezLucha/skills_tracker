import { schema } from "normalizr";

// definite normalizr entity schemas
export const userEntity = new schema.Entity("users");
export const commentEntity = new schema.Entity("comments", {
  commenter: userEntity
});
export const articleEntity = new schema.Entity("articles", {
  author: userEntity,
  comments: [commentEntity]
});
