import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { JournalApp } from "./JournalApp.jsx";

import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <JournalApp />
    </BrowserRouter>
  </StrictMode>
);