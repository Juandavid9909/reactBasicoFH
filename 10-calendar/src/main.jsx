import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { CalendarApp } from "./CalendarApp.jsx";

import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>,
);