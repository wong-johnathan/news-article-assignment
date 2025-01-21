import { ArticleBadge } from "./ArticleBadge";
import { Article } from "../../Types";
import { FC } from "react";
export const ArticleBadges: FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div className="flex flex-col gap-5">
      {articles.map((article) => (
        <ArticleBadge key={article.id} {...article} />
      ))}
    </div>
  );
};
