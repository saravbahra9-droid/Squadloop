import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./fonts.css";
import "./styles.css";
import { inject } from "@vercel/analytics";

// Privacy-friendly visit statistics. Shows data once Web Analytics is switched
// on for the project in the Vercel dashboard.
inject();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
