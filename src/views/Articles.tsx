import { ArticleBadges } from "../Components/ArticleBadges/ArticleBadges";
import { Pagination } from "../Components/Pagination";
import { Link } from "react-router-dom";
import { useArticles } from "../Context/articlesContext";

export const Articles = () => {
  const { articles, totalCount, page, setPage } = useArticles();
  return (
    <>
      <div className="flex justify-center gap-5">
        <Link
          to="/articles/new"
          className="bg-[#088080] text-white px-6 py-2 rounded-md hover:bg-[#1b4141] transition-all duration-300 w-auto whitespace-nowrap"
        >
          New Article
        </Link>
      </div>
      <p className="font-semibold text-xl text-[#088080]">
        {totalCount} ARTICLES FOUND
      </p>
      <ArticleBadges articles={articles} />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalCount / 5)}
        onPageChange={setPage}
      />
    </>
  );
};
