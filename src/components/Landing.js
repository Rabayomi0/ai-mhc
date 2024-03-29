import React, { useEffect } from "react";
import "./Landing.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterName from "./EnterName";
import App from "../App";

function Landing() {
  const [Name, setName] = useState("");
  const handleChange = (props) => {
    setName(props.target.value);
  };

  // const nav = useNavigate();
  const handleSubmit = (event) => {
    alert("You entered your name: " + Name);
    event.preventDefault();
    // nav(<App />);
  };

  return (
    <div className="landing-page">
      <div className="block-page">
        <h1
          style={{
            color: "aliceblue",
            margin: "0px",
            padding: "5px",
            fontSize: "50px",
          }}
        >
          A.I. Mental Health Coach
        </h1>
        <p style={{ color: "aliceblue", fontSize: "20px" }}>
          What is your name?
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            size={50}
            value={Name}
            onChange={handleChange}
          ></input>
          <button type="submit">Enter</button>
          <h2>
            Your name is <EnterName n={Name} />{" "}
          </h2>
        </form>
      </div>
    </div>
  );
}

export default Landing;
