import { FC, ReactNode, useContext, useState } from "react";

import useSWR, { mutate } from "swr";
import { Article } from "../Types";
import { createContext } from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";

export const getArticles = async (page: number, perPage: number) => {
  const response = await axios.get(
    `http://localhost:3001/articles?_page=${page}&_per_page=${perPage}`
  );
  return { articles: response.data.data, totalCount: response.data.items };
};

interface ArticlesContextType {
  articles: Article[];
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (articleId: string) => void;
  createArticle: (article: Omit<Article, "id">) => void;
}

export const ArticlesContext = createContext<ArticlesContextType>({
  articles: [],
  totalCount: 0,
  page: 1,
  setPage: () => {},
  updateArticle: () => {},
  deleteArticle: () => {},
  createArticle: () => {},
});

export const ArticlesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState(1);
  const { data } = useSWR<{ articles: Article[]; totalCount: number }>(
    `http://localhost:3001/articles?_page=${page}&_per_page=5`,
    () => getArticles(page, 10)
  );

  const updateArticle = async (article: Article) => {
    mutate(
      `http://localhost:3001/articles?_page=${page}&_per_page=5`,
      async (
        currentData: { articles: Article[]; totalCount: number } | undefined
      ) => {
        if (!currentData) return currentData;
        const updatedArticles = currentData.articles.map((a) =>
          a.id === article.id ? { ...a, ...article } : a
        );

        return { ...currentData, articles: updatedArticles };
      },
      false
    );

    await axios.put(`http://localhost:3001/articles/${article.id}`, article);
    mutate(`http://localhost:3001/articles?_page=${page}&_per_page=5`);
  };

  const deleteArticle = async (articleId: string) => {
    mutate(
      `http://localhost:3001/articles?_page=${page}&_per_page=5`,
      async (
        currentData: { articles: Article[]; totalCount: number } | undefined
      ) => {
        if (!currentData) return currentData;

        const updatedArticles = currentData.articles.filter(
          (a) => a.id !== articleId
        );

        return {
          ...currentData,
          articles: updatedArticles,
          totalCount: currentData.totalCount - 1,
        };
      },
      false
    );

    await axios.delete(`http://localhost:3001/articles/${articleId}`);

    mutate(`http://localhost:3001/articles?_page=${page}&_per_page=5`);
  };

  const createArticle = async (article: Omit<Article, "id">) => {
    mutate(
      `http://localhost:3001/articles?_page=${page}&_per_page=5`,
      async (
        currentData: { articles: Article[]; totalCount: number } | undefined
      ) => {
        if (!currentData) return currentData;

        const newArticle = { ...article, id: faker.string.uuid() };

        const updatedArticles = [newArticle, ...currentData.articles];

        return {
          ...currentData,
          articles: updatedArticles,
          totalCount: currentData.totalCount + 1,
        };
      },
      false
    );

    await axios.post(`http://localhost:3001/articles`, article);

    mutate(`http://localhost:3001/articles?_page=${page}&_per_page=5`);
  };
  return (
    <ArticlesContext.Provider
      value={{
        articles: data?.articles || [],
        totalCount: data?.totalCount || 0,
        page,
        setPage,
        updateArticle,
        deleteArticle,
        createArticle,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticleProvider");
  }
  return context;
};
