import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ArticlesList.module.css";
import {
  fetchArticle,
  selectTotalArticles,
  selectAllArticles
} from "./articlesSlice";
import { ArticleDisplay } from "./ArticleDisplay";

export function ArticlesList() {
  const articlesCount = useSelector(selectTotalArticles);
  const articles = useSelector(selectAllArticles);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Fetch Article"
          onClick={() => dispatch(fetchArticle(1))}
        >
          Fetch Article
        </button>
      </div>
      <div className={styles.row}>
        There are <span className={styles.value}>{articlesCount}</span>{" "}
        articles. {articlesCount === 0 && `Why don't you fetch one?`}
      </div>
      <hr />
      {articles.map(article => (
        <div className={styles.row} key={article.id}>
          <ArticleDisplay id={article.id} />
        </div>
      ))}
    </div>
  );
}
