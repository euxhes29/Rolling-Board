import React from "react";
import "./Buttons.scss";

const Button = ({ className, children, onClick, type }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
