import React from "react";
import "./Buttons.scss";

const Variants = {
  solid: "btn-solid",
  text: "btn-text",
  hover: "btn-hover",
  ghost: "btn-ghost",
};

export default function Button({ children, variant, ...props }) {
  const variantClass = Variants[variant] || "";
  return (
    <button className={`btn ${variantClass}`} {...props}>
      {children}
    </button>
  );
}
