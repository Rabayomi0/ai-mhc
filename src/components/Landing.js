import React from "react";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-page">
      <h1 style={{color: "aliceblue"}}>A.I. Mental Health Coach</h1>
      <div className="animation-text">
        <p>
          What kind of personality would you like me to have?{" "}
          <span className="type"></span>
        </p>
      </div>
      <input size={50}></input>
    </div>
  );
}

export default Landing;
