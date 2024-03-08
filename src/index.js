import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";

//CANNOT USE OpenAI from client, has to be from server-side.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
