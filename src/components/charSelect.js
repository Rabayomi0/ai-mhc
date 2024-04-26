import React from "react";

function charSelect(props) {
  const proceedChat = () => {
    window.location.href = "/mainchat";
  };
  const title = props.title;
  return (
    <div onClick={proceedChat}>
      <h1>{title}</h1>
    </div>
  );
}

export default charSelect;
