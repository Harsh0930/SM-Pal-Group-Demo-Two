import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/responsive.css";
import "./styles/prateek.css";
import "./styles/about.css";
import "./styles/board.css";
import "./styles/pal-group.css";
import "./styles/home.css";
import "./styles/brand-consistency.css";
import "./styles/ownership.css";
import "./styles/industries.css";
import "./styles/pal-fresh-global.css";
import "./styles/pal-fresh-products.css";
import "./styles/prose.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
