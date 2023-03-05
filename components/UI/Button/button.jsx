import React from "react";
import "./button.css";

const CorbaeButton = ({ children, ...props }) => {
  return (
    <button {...props} className="CBBtn">
      {children}
    </button>
  );
};

export default CorbaeButton;
