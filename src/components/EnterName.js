import React from "react";

function EnterName(props) {
  const name = props.n;
  console.log(name);
  return <div>{name}</div>;
}

export default EnterName;
