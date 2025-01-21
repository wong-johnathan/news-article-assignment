import { ArticleForm } from "./views/ArticleForm";
import { Articles } from "./views/Articles";

import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className="mx-8 my-5 flex flex-col gap-5">
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/new" element={<ArticleForm />} />
        <Route path="/articles/:id" element={<ArticleForm />} />
      </Routes>
    </div>
  );
};
