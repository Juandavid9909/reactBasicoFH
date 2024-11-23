import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";

import { JournalApp } from "./JournalApp.jsx";
import { store } from "./store";

import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
      <JournalApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);