import moment from "moment";
import { FC } from "react";
import { IconBtn } from "../IconBtn";
import { Link } from "react-router-dom";
import { Article } from "../../Types";
import { useArticles } from "../../Context/articlesContext";

export const ArticleBadge: FC<Article> = ({
  id,
  publisher,
  title,
  summaries,
  publishedDate,
  bookMarked,
}) => {
  const { updateArticle, deleteArticle } = useArticles();
  const handleBookmark = () => {
    updateArticle({
      id,
      publisher,
      title,
      summaries,
      publishedDate,
      bookMarked: !bookMarked,
    });
  };
  const handleDelete = () => {
    deleteArticle(id);
  };
  return (
    <div
      className="min-h-32 w-full bg-white p-5 shadow-md hover:bg-slate-100 transition-all duration-300 hover:scale-[1.01]"
      id="articleBox"
    >
      <div>
        <div className="flex flex-row justify-between items-center">
          <h5 className="font-semibold text-md text-slate-500 mb-3">
            {publisher}
          </h5>
          <div className="flex flex-row gap-2">
            <IconBtn icon="fa-regular fa-trash-can" onClick={handleDelete} />
            <IconBtn
              icon={
                bookMarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
              }
              onClick={handleBookmark}
            />
            <Link to={`/articles/${id}`}>
              <IconBtn icon="fa-regular fa-pen-to-square" onClick={() => {}} />
            </Link>
          </div>
        </div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex flex-row gap-5 text-sm border-b border-gray-300 py-3 mb-3">
          <div>AUTO-SUMMARISED BY SCOUTASIA</div>
          <div> | </div>
          <div>{moment(publishedDate).format("DD MMM YYYY hh:mm")}</div>
        </div>
        <div>
          <ul className="list-disc pl-5 space-y-2 ">
            {summaries.split("\n").map((summary, index) => (
              <li key={index}>{summary}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
