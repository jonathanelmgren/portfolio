"use client";
import { useEffect, useState } from "react";

const EMAIL = "jonathan@elmgren.dev";

export const EmailButton = () => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 1250);
    }
  }, [clicked, setClicked]);

  const handleClick = () => {
    navigator.clipboard.writeText(EMAIL);
    setClicked(true);
  };
  return (
    <button
      onClick={handleClick}
      className={`hover:text-white hover:bg-primary copied relative text-primary text-xl p-5 border-2 border-primary border-spacing-1${clicked ? " active" : ""}`}
    >
      {EMAIL}
    </button>
  );
};
