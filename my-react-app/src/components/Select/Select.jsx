import React from "react";

const Select = ({ label, className, value, onChange, children }) => {
  return (
    <>
      <label>{label}</label>
      <select className={className} value={value} onChange={onChange}>
        {children}
      </select>
    </>
  );
};

export default Select;
