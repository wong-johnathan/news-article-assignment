import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ArticlesProvider } from "./Context/articlesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ArticlesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ArticlesProvider>
  </StrictMode>
);
