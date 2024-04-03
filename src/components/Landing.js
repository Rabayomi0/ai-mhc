import "./Landing.css";
import { useState } from "react";

function Landing() {
  const [Name, setName] = useState("");
  const handleChange = (props) => {
    setName(props.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(document.querySelector("form"));
    const obj = Object.fromEntries(fd);

    const json = JSON.stringify(obj);
    localStorage.setItem("form", json);
    window.location.href = "/mainchat";
  };

  return (
    <div className="landing-page">
      <h1 className="bigText">A.I. Mental Health Coach</h1>
      <div className="block-page">
        <p style={{ color: "aliceblue" }}>What is your name?</p>
        <form onSubmit={handleSubmit}>
          <input
            className="input-box"
            type="text"
            size={50}
            value={Name}
            name="User"
            onChange={handleChange}
          ></input>
          <button
            className="input-button"
            type="submit"
            style={{ padding: "10px" }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
