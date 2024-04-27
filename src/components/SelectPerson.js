import React from "react";
import "./SelectPerson.css";
import CharSelect from "./CharSelect";

function SelectPerson() {
  const json = localStorage.getItem("form");
  const obj = JSON.parse(json);

  var t = "";
  for (const key in obj) {
    t = `${obj[key]}`;
  }

  return (
    <div className="main-container">
      <h1
        style={{
          color: "aliceblue",
          fontFamily: "Press Start 2P",
          fontSize: "28px",
        }}
      >
        What personality would you like me to have,{" "}
        <span style={{ color: "blue" }}>{t}</span>?
      </h1>
      <CharSelect />
    </div>
  );
}

export default SelectPerson;
