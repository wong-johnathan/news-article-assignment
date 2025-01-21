import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Article } from "../Types";
import { useArticles } from "../Context/articlesContext";

type FormDataType = Pick<
  Article,
  "title" | "summaries" | "publishedDate" | "publisher"
>;

export const ArticleForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    summaries: "",
    publishedDate: new Date(),
    publisher: "",
  });
  const { articles, updateArticle, createArticle } = useArticles();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const article = articles.find((article) => article.id === id);
      if (article) {
        setFormData({
          ...article,
          publishedDate: new Date(article.publishedDate),
        });
      }
    }
  }, [id, articles]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.title.trim()) errors.title = "Article title is required.";
    if (!formData.summaries.trim())
      errors.summaries = "Article summary is required.";
    if (!formData.publishedDate)
      errors.publishedDate = "Article date is required.";
    if (!formData.publisher.trim()) errors.publisher = "Publisher is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (id) {
      const article = articles.find((article) => article.id === id);
      if (article) {
        updateArticle({ ...article, ...formData });
        alert("Article updated successfully!");
      }
    } else {
      createArticle({ ...formData, bookMarked: false });
      alert("Article created successfully!");
    }

    setFormData({
      title: "",
      summaries: "",
      publishedDate: new Date(),
      publisher: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">
          {id ? "Update News Article" : "Create News Article"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              Article Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#088080] outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              Article Summary
            </label>
            <textarea
              name="summaries"
              value={formData.summaries}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#088080] outline-none"
              rows={4}
            />
            {errors.summary && (
              <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              Article Date
            </label>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate.toISOString().split("T")[0]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#088080] outline-none"
            />
            {errors.publishedDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.publishedDate}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              Publisher of Article
            </label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#088080] outline-none"
            />
            {errors.publisher && (
              <p className="text-red-500 text-sm mt-1">{errors.publisher}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-[#088080] text-white px-6 py-2 rounded-md hover:bg-[#066666] transition-all"
            >
              Submit
            </button>
            <button
              type="button"
              className="text-slate-500 underline hover:text-[#088080] transition-all"
              onClick={() => navigate("/articles")}
            >
              View Articles
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
