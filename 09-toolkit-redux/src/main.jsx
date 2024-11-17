import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store";
import { TodoApp } from "./TodoApp.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={ store }>
      <TodoApp />
    </Provider>
  </StrictMode>
);