import React from "react";
import "./SelectPerson.css";
import charSelect from "./charSelect";

function SelectPerson(props) {
  const json = localStorage.getItem("form");
  const obj = JSON.parse(json);

  var t = "";
  for (const key in obj) {
    t = `${obj[key]}`;
  }

  return (
    <div className="main-container">
      <h1 style={{ color: "aliceblue", fontFamily: "Press Start 2P" }}>
        What personality would you like me to have,{" "}
        <span style={{ color: "blue" }}>{t}</span>?
      </h1>
      <div className="selection">
        <charSelect title="Sarcastic" />
        <charSelect title="Formal" />
        <charSelect title="Energetic" />
      </div>
    </div>
  );
}

export default SelectPerson;
