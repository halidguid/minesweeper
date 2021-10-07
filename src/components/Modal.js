import React, { useState, useEffect } from "react";

export default function Modal({ restartGame, title }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);
  return (
    <div>
      <div>
        <h1 style={{backgroundColor:'red'}}>{title}</h1>
      </div>
      <button  className= "" style = {{backgroundColor:'lightBlue'}} onClick={() => restartGame()}>
        Play Again
      </button>
    </div>
  );
}

