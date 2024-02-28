import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
// import openai from "./components/openai-test";

// async function main() {
//   const chatCompletion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a sarcastic, but well meaning mental health advocate.",
//       },
//     ],
//     model: "gpt-3.5-turbo",
//   });
//   console.log(chatCompletion.choices[0]);
// }

// main();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
